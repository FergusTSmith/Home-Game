class PokerHandEvaluator {
  // Convert card rank to numeric value
  getCardValue(card) {
    const rank = card[0].toUpperCase();

    const rankMap = {
      2: 2,
      3: 3,
      4: 4,
      5: 5,
      6: 6,
      7: 7,
      8: 8,
      9: 9,
      T: 10,
      J: 11,
      Q: 12,
      K: 13,
      A: 14,
    };

    return rankMap[rank];
  }

  // Extract suit from card
  getCardSuit(card) {
    return card[1].toUpperCase();
  }
  // Generate all k-combinations from array
  _getCombinations(arr, k) {
    const results = [];

    const helper = (start, combo) => {
      if (combo.length === k) {
        results.push([...combo]);
        return;
      }
      for (let i = start; i < arr.length; i++) {
        combo.push(arr[i]);
        helper(i + 1, combo);
        combo.pop();
      }
    };

    helper(0, []);
    return results;
  }
  _compareTiebreakers(a, b) {
    const len = Math.max(a.length, b.length);

    for (let i = 0; i < len; i++) {
      const av = a[i] ?? 0;
      const bv = b[i] ?? 0;
      if (av > bv) return 1;
      if (av < bv) return -1;
    }
    return 0; // equal
  }

  getBestHand(playerCards, communityCards) {
    const allCards = [...playerCards, ...communityCards];
    const all5CardCombos = this._getCombinations(allCards, 5);

    let bestRank = 0;
    let bestHand = null;
    let bestTiebreakers = [];

    for (const hand of all5CardCombos) {
      const [rank, tiebreakers] = this.evaluateHand(hand);

      if (
        rank > bestRank ||
        (rank === bestRank &&
          this._compareTiebreakers(tiebreakers, bestTiebreakers) > 0)
      ) {
        bestRank = rank;
        bestHand = hand;
        bestTiebreakers = tiebreakers;
      }
    }

    bestHand = this.sortHandForDisplay(bestHand, bestRank);
    return [bestRank, bestTiebreakers, bestHand];
  }

  // Check if given sorted values form a straight
  _isStraight(values) {
    // Handle A-5 straight: [A, 5, 4, 3, 2] → treat Ace as 1
    const uniqueValues = [...new Set(values)];

    if (uniqueValues.length !== 5) return false;

    // Normal straight check
    let isNormalStraight = true;
    for (let i = 0; i < 4; i++) {
      if (values[i] - 1 !== values[i + 1]) {
        isNormalStraight = false;
        break;
      }
    }

    if (isNormalStraight) return true;

    // Check Ace-low straight
    // Values should be: [14, 5, 4, 3, 2]
    const aceLow = [14, 5, 4, 3, 2];
    return JSON.stringify(values) === JSON.stringify(aceLow);
  }

  sortHandForDisplay(hand, rank) {
    if (!hand || !Array.isArray(hand)) return hand;

    const valueCounts = {};
    for (const card of hand) {
      const value = this.getCardValue(card);
      if (!valueCounts[value]) valueCounts[value] = [];
      valueCounts[value].push(card);
    }

    const sortedGroups = Object.entries(valueCounts)
      .map(([v, cards]) => [parseInt(v, 10), cards])
      .sort((a, b) => {
        // First sort by count (desc)
        if (b[1].length !== a[1].length) return b[1].length - a[1].length;
        // Then by card value (desc)
        return b[0] - a[0];
      });

    const simpleSortRanks = [10, 9, 6, 5, 1];
    if (simpleSortRanks.includes(rank)) {
      return [...hand].sort((a, b) => this.getCardValue(b) - this.getCardValue(a));
    }

    const result = [];
    for (const [, cards] of sortedGroups) {
      const groupSorted = [...cards].sort((a, b) => this.getCardValue(b) - this.getCardValue(a));
      result.push(...groupSorted);
    }
    return result;
  }

  

  evaluateHand(cards) {
    const cardValues = cards
      .map((card) => this.getCardValue(card))
      .sort((a, b) => b - a);

    const cardSuits = cards.map((card) => this.getCardSuit(card));

    const valueCounts = {};
    for (const value of cardValues) {
      valueCounts[value] = (valueCounts[value] || 0) + 1;
    }

    const counts = Object.entries(valueCounts)
      .map(([value, count]) => [parseInt(value), count])
      .sort((a, b) => {
        if (b[1] === a[1]) return b[0] - a[0];
        return b[1] - a[1];
      });

    const isFlush = new Set(cardSuits).size === 1;
    const isStraight = this._isStraight(cardValues);

    // Straight flush (Royal or otherwise)
    if (isStraight && isFlush) {
      return [cardValues[0] === 14 ? 10 : 9, [cardValues[0]]];
    }
    // Four of a kind
    else if (counts[0][1] === 4) {
      return [8, [counts[0][0], counts[1][0]]];
    }
    // Full house
    else if (counts[0][1] === 3 && counts[1][1] === 2) {
      return [7, [counts[0][0], counts[1][0]]];
    }
    // Flush
    else if (isFlush) {
      return [6, cardValues];
    }
    // Straight
    else if (isStraight) {
      return [5, [cardValues[0]]];
    }
    // Three of a kind
    else if (counts[0][1] === 3) {
      const kickers = counts.slice(1).map((c) => c[0]);
      return [4, [counts[0][0], ...kickers]];
    }
    // Two pair
    else if (counts[0][1] === 2 && counts[1][1] === 2) {
      return [3, [counts[0][0], counts[1][0], counts[2][0]]];
    }
    // One pair
    else if (counts[0][1] === 2) {
      const kickers = counts.slice(1).map((c) => c[0]);
      return [2, [counts[0][0], ...kickers]];
    }
    // High card
    else {
      return [1, cardValues];
    }
  }
}

module.exports = PokerHandEvaluator;
