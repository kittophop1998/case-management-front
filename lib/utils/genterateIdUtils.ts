export function generateRequestId(): string {
  const now = new Date();

  const pad = (num: number) => num.toString().padStart(2, '0');

  const year = now.getFullYear().toString().slice(-2); // YY
  const month = pad(now.getMonth() + 1);               // MM
  const day = pad(now.getDate());                      // DD
  const hours = pad(now.getHours());                   // HH
  const minutes = pad(now.getMinutes());               // MM
  const seconds = pad(now.getSeconds());               // SS

  const timestamp = `${year}${month}${day}${hours}${minutes}${seconds}`;

  const randomPart = [...Array(6)]
    .map(() => {
      const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      return chars.charAt(Math.floor(Math.random() * chars.length));
    })
    .join('');

  return `RQ${timestamp}${randomPart}`;
}
