import FlagQuizImage from "../assets/FlagQuizImage.png";
import GeographyDetectiveImage from "../assets/GeographyDetectiveImage.jpg";
import PixelatedFlagQuizImage from "../assets/PixelatedFlagQuizImage.PNG";

// { name: "US City Quiz", link: "/us-city-quiz", img: PixelatedFlagQuizImage, subtitle: "Learn the cities of the United States of America!", instructions: "Guess the shown language!", backgroundColor: "hsl(70, 20%, 20%)", diffLevels: ["Easy", "Hard"] }
export const CardList = [
  { name: "Geography Detective", link: "/geography-detective", img: GeographyDetectiveImage, subtitle: "A random country has been chosen and it's your job to find it!", instructions: "Type in the name of a country to see its distance from the target country. Keep guessing until you get it right!", diffLevels: ["Easy", "Medium", "Hard", "Impossible"], backgroundColor: "hsl(48, 20%, 20%)" },
  { name: "Flag Quiz", link: "/flag-quiz", img: FlagQuizImage, subtitle: "Learn the flags of the world by getting as high of a streak as you can!", instructions: "Identify each flag you are shown, see how high of a streak you can achieve!", diffLevels: ["Easy", "Medium", "Hard", "Impossible"], backgroundColor: "hsl(200, 20%, 20%)" },
  { name: "Pixelated Flag Quiz", link: "/pixelated-flag-quiz", img: PixelatedFlagQuizImage, subtitle: "Uncover the flags of the world!", instructions: "Can't identify the flag? Click to reveal more until you make your guess. Try to get as many points as you can!", diffLevels: ["Easy", "Medium", "Hard", "Impossible"], backgroundColor: "hsl(0, 20%, 20%)" },
  { name: "Language Quiz", link: "/language-quiz", img: PixelatedFlagQuizImage, subtitle: "Learn the languages of the world!", instructions: "Guess the shown language!", backgroundColor: "hsl(70, 20%, 20%)", diffLevels: ["Easy", "Hard"] }
];
