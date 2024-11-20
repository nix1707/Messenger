export const truncateFileName = (fileName: string, maxLength: number) => {
  if (fileName.length <= maxLength) return fileName;

  const extension = fileName.slice(fileName.lastIndexOf("."));
  const nameWithoutExtension = fileName.slice(0, fileName.lastIndexOf("."));
  const truncatedName = nameWithoutExtension.slice(
    0,
    maxLength - extension.length - 3
  );

  return `${truncatedName}...${extension}`;
};

export const formatVideoTime = (time: number) => {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60)
    .toString()
    .padStart(2, "0");
  return `${minutes}:${seconds}`;
};

export const generateAvatarColor = (name: string): string => {
  const colors = [
    "#F44336",
    "#E91E63",
    "#9C27B0", 
    "#3F51B5", 
    "#2196F3", 
    "#00BCD4", 
    "#4CAF50", 
    "#FF9800", 
    "#FF5722", 
    "#795548", 
  ];
  const index = name.charCodeAt(0) % colors.length;
  return colors[index];
};
