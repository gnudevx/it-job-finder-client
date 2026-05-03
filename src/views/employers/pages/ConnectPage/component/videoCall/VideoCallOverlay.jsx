// component/videoCall/VideoCallOverlay.jsx
import { useEffect, useRef, useState, useCallback } from 'react';
import { socket } from '@/services/socket';
import styles from './VideoCallOverlay.module.scss';
import PropTypes from 'prop-types';

const ICE_SERVERS = {
  iceServers: [{ urls: 'stun:stun.l.google.com:19302' }],
};

export default function VideoCallOverlay({
  conversationId,
  chatUser,
  role,
  onClose,
  onCallEnded,
}) {
  const [status, setStatus] = useState('connecting'); // connecting | in-call | ended | declined | missed
  const [isMuted, setIsMuted] = useState(false);
  const [isCamOff, setIsCamOff] = useState(false);
  const [callDuration, setCallDuration] = useState(0);

  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const pcRef = useRef(null);
  const localStreamRef = useRef(null);
  const timerRef = useRef(null);
  const startTimeRef = useRef(null);

  const isCaller = role === 'caller'; // true = mình là người được gọi

  // ── Cleanup ───────────────────────────────────────────────────────────────
  const cleanup = useCallback(() => {
    clearInterval(timerRef.current);
    if (pcRef.current) {
        pcRef.current.close();
        pcRef.current = null; // 👈 THÊM DÒNG NÀY
    }
    localStreamRef.current?.getTracks().forEach((t) => t.stop());
    localStreamRef.current = null;
    }, []);

  // ── Kết thúc cuộc gọi ─────────────────────────────────────────────────────
  const endCall = useCallback(
    (notify = true) => {
      if (notify) socket.emit('call:end', { conversationId });
      cleanup();
      setStatus('ended');
      setTimeout(onClose, 1500);
    },
    [conversationId, cleanup, onClose]
  );

  // ── Khởi tạo WebRTC ───────────────────────────────────────────────────────
  useEffect(() => {
  let isCancelled = false;

  const init = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    if (isCancelled) {
      stream.getTracks().forEach((t) => t.stop());
      return;
    }

    localStreamRef.current = stream;
    if (localVideoRef.current) localVideoRef.current.srcObject = stream;

    const pc = new RTCPeerConnection(ICE_SERVERS);
    pcRef.current = pc;
    stream.getTracks().forEach((track) => pc.addTrack(track, stream));
    console.log(stream.getAudioTracks());
    pc.ontrack = ({ streams }) => {
  const remoteStream = streams[0];

  console.log('REMOTE STREAM:', remoteStream);
  console.log('AUDIO TRACKS:', remoteStream.getAudioTracks());

  const video = remoteVideoRef.current;

  if (video) {
    video.srcObject = remoteStream;

    video.onloadedmetadata = () => {
      video.play().catch(err => console.log('Play error:', err));
    };
  }

  setStatus('in-call');
  startTimeRef.current = Date.now();
  timerRef.current = setInterval(() => {
    setCallDuration(Math.floor((Date.now() - startTimeRef.current) / 1000));
  }, 1000);
};
    
    pc.onicecandidate = ({ candidate }) => {
      if (candidate) socket.emit('call:ice-candidate', { conversationId, candidate });
    };

    // ✅ Caller KHÔNG gửi offer ở đây nữa
    // Sẽ gửi khi nhận được 'call:accepted' từ server
  };

  const handleOffer = async ({ sdp }) => {
    let waited = 0;
    while (!pcRef.current && waited < 3000) {
      await new Promise((r) => setTimeout(r, 50));
      waited += 50;
    }
    const pc = pcRef.current;
    if (!pc || pc.signalingState === 'closed') return;

    await pc.setRemoteDescription(new RTCSessionDescription(sdp));
    const answer = await pc.createAnswer();
    await pc.setLocalDescription(answer);
    socket.emit('call:answer', { conversationId, sdp: answer });
  };

  const handleAnswer = async ({ sdp }) => {
    const pc = pcRef.current;
    if (!pc || pc.signalingState === 'closed' || pc.signalingState === 'stable') return;
    await pc.setRemoteDescription(new RTCSessionDescription(sdp));
  };

  const handleIce = async ({ candidate }) => {
    const pc = pcRef.current;
    if (!pc || pc.signalingState === 'closed') return;
    try {
      await pc.addIceCandidate(new RTCIceCandidate(candidate));
    } catch (e) {
      console.error('ICE error', e);
    }
  };

  // ✅ KEY FIX: Caller nhận 'call:accepted' → lúc này callee đã mount xong → gửi offer
  const handleCallAccepted = async () => {
    if (!isCaller) return; // chỉ caller xử lý
    const pc = pcRef.current;
    if (!pc || pc.signalingState === 'closed') return;

    const offer = await pc.createOffer();
    await pc.setLocalDescription(offer);
    socket.emit('call:offer', { conversationId, sdp: offer });
  };

  const handleEnded = ({ message }) => {
    onCallEnded?.(message);
    cleanup();
    setStatus('ended');
    setTimeout(onClose, 1500);
  };

  const handleDeclined = ({ message }) => {
    onCallEnded?.(message);
    cleanup();
    setStatus('declined');
    setTimeout(onClose, 2000);
  };

  const handleMissed = ({ message }) => {
    onCallEnded?.(message);
    cleanup();
    setStatus('missed');
    setTimeout(onClose, 2000);
  };

  init().catch(console.error);

  socket.on('call:accepted', handleCallAccepted); // 👈 THÊM
  socket.on('call:offer', handleOffer);
  socket.on('call:answer', handleAnswer);
  socket.on('call:ice-candidate', handleIce);
  socket.on('call:ended', handleEnded);
  socket.on('call:declined', handleDeclined);
  socket.on('call:missed', handleMissed);

  return () => {
    isCancelled = true;
    socket.off('call:accepted', handleCallAccepted); // 👈 THÊM
    socket.off('call:offer', handleOffer);
    socket.off('call:answer', handleAnswer);
    socket.off('call:ice-candidate', handleIce);
    socket.off('call:ended', handleEnded);
    socket.off('call:declined', handleDeclined);
    socket.off('call:missed', handleMissed);
    cleanup();
  };
}, [conversationId]);

  const toggleMic = () => {
    const track = localStreamRef.current?.getAudioTracks()[0];
    if (!track) return;
    track.enabled = !track.enabled;
    setIsMuted(!track.enabled);
  };

  const toggleCam = () => {
    const track = localStreamRef.current?.getVideoTracks()[0];
    if (!track) return;
    track.enabled = !track.enabled;
    setIsCamOff(!track.enabled);
  };

  const formatDuration = (s) =>
    `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;

  const statusText = {
    connecting: `⏳ Đang gọi cho ${chatUser?.name}...`,
    'in-call': `🟢 ${formatDuration(callDuration)}`,
    ended: '📵 Cuộc gọi kết thúc',
    declined: '❌ Cuộc gọi bị từ chối',
    missed: '📵 Không có người nghe',
  };
  return (
    <div className={styles.overlay}>
      <div className={styles.callBox}>
        {/* Video remote (to) */}
        <video ref={remoteVideoRef} className={styles.remoteVideo} autoPlay playsInline />

        {/* Video local (nhỏ góc) */}
        <video ref={localVideoRef} className={styles.localVideo} autoPlay playsInline muted />

        {/* Header */}
        <div className={styles.header}>
          <img src={chatUser?.avatar} alt="" className={styles.avatar} />
          <div>
            <p className={styles.name}>{chatUser?.name}</p>
            <p className={styles.statusText}>{statusText[status]}</p>
          </div>
        </div>

        {/* Controls — chỉ hiện khi đang gọi */}
        {(status === 'connecting' || status === 'in-call') && (
          <div className={styles.controls}>
            <button onClick={toggleMic} className={isMuted ? styles.active : ''}>
              {isMuted ? '🔇' : '🎤'}
            </button>
            <button onClick={toggleCam} className={isCamOff ? styles.active : ''}>
              {isCamOff ? '📷' : '📹'}
            </button>
            <button className={styles.endBtn} onClick={() => endCall(true)}>
              📵
            </button>
          </div>
        )}

        {/* Màn hình kết thúc */}
        {['ended', 'declined', 'missed'].includes(status) && (
          <div className={styles.endedScreen}>
            <p>{statusText[status]}</p>
          </div>
        )}
      </div>
    </div>
  );
}
VideoCallOverlay.propTypes = {
  conversationId: PropTypes.string.isRequired,
  chatUser: PropTypes.object,
  callerId: PropTypes.string,
  currentUser: PropTypes.object,
  onClose: PropTypes.func.isRequired,
  onCallEnded: PropTypes.func,
  role: PropTypes.string,
};
