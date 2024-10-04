interface Player {
    id: number;
    buyin: number;
    rank: number;
}

interface Result {
    id: number;
    finalScore: number;
}

function distributePrize(players: Player[]): Result[] {
    // 총 인원의 20% 안에 들어가는 인원의 수 계산
    const numPlayers = players.length;
    const topPercentageCount = Math.max(1, Math.floor(numPlayers * 0.2)); // 최소 1명

    // 모든 플레이어의 buyin을 더해 prize pool 생성
    const totalPrizePool = players.reduce((sum, player) => sum + player.buyin, 0);

    // 등수로 오름차순 정렬
    players.sort((a, b) => a.rank - b.rank);

    // 상위 20% 플레이어들만 추출
    const topPlayers = players.slice(0, topPercentageCount);

    // 상위 플레이어들만으로 등수 가중치 계산
    const totalRankWeight = topPlayers.reduce((sum, _, index) => sum + (topPercentageCount - index), 0);

    // 결과를 저장할 배열, 기본적으로 모든 플레이어는 buyin 만큼 손해
    const result: Result[] = players.map(player => ({
        id: player.id,
        finalScore: -player.buyin
    }));

    // 상위 플레이어들에게 차등 prize 분배
    topPlayers.forEach((player, index) => {
        const rankWeight = topPercentageCount - index;
        const distributedPrize = (rankWeight / totalRankWeight) * totalPrizePool;

        // 해당 플레이어의 buyin을 뺀 최종 점수 계산
        const finalScore = distributedPrize - player.buyin;

        // 결과 배열에 최종 점수 반영
        const resultIndex = result.findIndex(res => res.id === player.id);
        result[resultIndex].finalScore = finalScore;
    });

    return result;
}

// 테스트 데이터
const players: Player[] = [
    { id: 1, buyin: 200, rank: 1 },
    { id: 2, buyin: 100, rank: 2 },
    { id: 3, buyin: 300, rank: 3 },
    { id: 4, buyin: 200, rank: 4 },
    { id: 5, buyin: 100, rank: 5 },
    { id: 6, buyin: 300, rank: 6 },
    { id: 7, buyin: 300, rank: 7 },
    { id: 8, buyin: 300, rank: 8 },
    { id: 9, buyin: 200, rank: 9 },
    { id: 10, buyin: 100, rank: 10 }
];

// 테스트 실행
console.log(distributePrize(players));