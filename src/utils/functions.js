function addLeftZero(num) {
  return num.toString().padStart(2, 0);
}

export const timeFormatter = (timeInMilliseconds) => {
  const hours = Math.trunc((timeInMilliseconds / 3_600_000) % 60);
  const minutes = addLeftZero(Math.trunc(timeInMilliseconds / 60_000) % 60);
  const seconds = addLeftZero(Math.trunc((timeInMilliseconds % 60_000) / 1000));
  const centiSeconds = addLeftZero(
    Math.trunc(((timeInMilliseconds % 60_000) % 1000) / 10)
  );
  return `${hours ? `${hours}:` : ""}${minutes}:${seconds}.${centiSeconds}`;
};
