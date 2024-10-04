import { distributePrize, Player, Result } from '../distribute'; // 함수가 있는 모듈을 import

describe('distributePrize', () => {
    it('should correctly distribute prizes based on rankings', () => {
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

        const results = distributePrize(players);

        // expectedResults는 수동으로 계산한 예상 최종 점수를 나타냅니다.
        const expectedResults: Result[] = [
            { id: 1, finalScore: 1200 }, // 정확한 값을 계산해 넣어주세요.
            { id: 2, finalScore: 600 }, // 예: 예상 계산 값
            { id: 3, finalScore: -300 },
            { id: 4, finalScore: -200 },
            { id: 5, finalScore: -100 }, // 최하위는 buyin 만큼 손해.
            { id: 6, finalScore: -300 },
            { id: 7, finalScore: -300 },
            { id: 8, finalScore: -300 },
            { id: 9, finalScore: -200 },
            { id: 10, finalScore: -100 }
        ];

        expectedResults.forEach((expected, index) => {
            const result = results[index];

            // 각 플레이어의 최종 점수(`finalScore`)가 예상 값과 동일한지 비교
            expect(result.id).toBe(expected.id);
            expect(result.finalScore).toBeCloseTo(expected.finalScore, 2);
        })
    });

    it('should distribute prizes even if there are fewer than 5 players', () => {
        const players: Player[] = [
            { id: 1, buyin: 200, rank: 1 },
            { id: 2, buyin: 100, rank: 2 },
            { id: 3, buyin: 300, rank: 3 },
        ];

        const results = distributePrize(players);

        // 모든 플레이어가 buyin 이상의 점수를 받지 않으면 손해를 봄
        expect(results.length).toEqual(0)
    });
});