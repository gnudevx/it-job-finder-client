const QuickDetailItem = ({ icon, title, value }) => {
  return (
    <div className="qd-item">
      <div className="qd-icon" dangerouslySetInnerHTML={{ __html: icon }} />
      <div className="qd-content">
        <div className="qd-title">{title}</div>
        <div className="qd-value">{value}</div>
      </div>
    </div>
  );
};

export default QuickDetailItem;
