export const useGetDateAndHours = () => {
  const getDateAndHours = (dateDoc) => {
    const optionsDate = {
      date: {
        year: "numeric",
        month: "long",
        day: "numeric",
      },
      hours: {
        hour: "numeric",
        minute: "numeric",
      },
    };

    const dataAtual = new Date();
    const date = new Date(dateDoc);
    const formatedDate = date.toLocaleDateString("pt-BR", optionsDate.date);
    const formatedDateHours = date.toLocaleTimeString(
      "pt-BR",
      optionsDate.hours
    );
    let time1 = dateDoc.getTime();
    let time2 = dataAtual.getTime();
    let differenceInMilliseconds = time2 - time1;
    let differenceInDays = differenceInMilliseconds / 86400000;
    let differenceInHours = differenceInDays * 24;
    let differenceInMinutes = differenceInHours * 60;

    let differenceInWeeks = differenceInDays / 7;
    let differenceInMonths = differenceInDays / 30;
    let differenceInYears = differenceInDays / 365;

    let dateDifference = undefined;

    if (differenceInMinutes < 60) {
      dateDifference = Math.floor(differenceInMinutes) + " min";
      if (dateDifference.includes("0 min")) {
        dateDifference = "Agora";
      }
    } else if (differenceInHours < 24) {
      dateDifference = Math.floor(differenceInHours) + " h";
    } else if (differenceInDays < 7) {
      dateDifference = Math.floor(differenceInDays) + " d";
    } else if (differenceInWeeks < 5) {
      dateDifference = Math.floor(differenceInWeeks) + " sem";
    } else if (differenceInMonths < 12 && differenceInMonths > 0) {
      dateDifference = Math.floor(differenceInMonths) + " m";
    } else {
      dateDifference = Math.floor(differenceInYears) + " a";
    }
    return { formatedDate, formatedDateHours, dateDifference };
  };
  return { getDateAndHours };
};
