// // Utility function to format the date
// const formatDate = (dateStr) => {
//     const date = new Date(dateStr);
//     const today = new Date();
//     const options = { day: '2-digit', month: '2-digit', year: '2-digit' };
  
//     if (date.toDateString() === today.toDateString()) {
//       // Today
//       return `오늘`;
//     } else if (date > today.setDate(today.getDate() - 7)) {
//       // This week
//       return `${date.toLocaleDateString('en-GB', options)}`;
//     } else {
//       // Older dates
//       return `${date.toLocaleDateString('en-GB', options)}`;
//     }
//   };
  