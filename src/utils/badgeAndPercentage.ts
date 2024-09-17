export const getBadgeAndPercentage = (rewardsCount: number) => {
    let badge = '';
    let percentage = 0;
    let discount = 0;

    if (rewardsCount >= 0 && rewardsCount <= 500) {
        badge = 'Silver';
        percentage = parseFloat(((rewardsCount / 500) * 100).toFixed(2)); // Calculate percentage for 0 to 500
        discount = 0;
      } else if (rewardsCount > 500 && rewardsCount <= 20000) {
        badge = 'Golden';
        percentage = parseFloat((((rewardsCount - 500) / (20000 - 500)) * 100).toFixed(2)); // Calculate percentage for 501 to 20000
        discount = 5;
      } else if (rewardsCount > 20000) {
        badge = 'Diamond';
        percentage = 100; // Maximum badge level, set percentage to 100%
        discount = 9;
      }
    
      return { badge, percentage, discount };
    };