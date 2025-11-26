export function getRankInfo(tpPoint) {
    const ranks = [
        { label: "Member", min: 0 },
        { label: "Silver", min: 300 },
        { label: "Gold", min: 800 },
        { label: "Platinum", min: 1500 },
        { label: "Diamond", min: 2500 },
    ];
    const current =
        ranks.slice().reverse().find((r) => tpPoint >= r.min) || ranks[0];
    return { ranks, current, progress: Math.min((tpPoint / 2500) * 100, 100) };
}