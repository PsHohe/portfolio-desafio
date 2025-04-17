import figlet from 'figlet';
import { promisify } from 'util';

// Convert figlet.text to a promise-based function
const figletPromise = promisify(figlet.text);

/**
 * Generate ASCII art from text using the specified font
 * @param {string} text - The text to convert to ASCII art
 * @param {string} font - The font to use (default: 'Standard')
 * @returns {Promise<string>} - The generated ASCII art
 */
export async function generateAsciiArt(text, font = 'Standard') {
  try {
    // Use figlet to convert the text to ASCII art
    const rendered = await figletPromise(text, {
      font: font
    });
    return rendered;
  } catch (error) {
    console.error(`Error generating ASCII art with font ${font}:`, error);
    // Return a fallback ASCII art if generation fails
    return `
     _____                 _      _             
    / ____|               | |    (_)            
   | (___   __ _ _ __   __| |_ __ _ _ __   ___  
    \\___ \\ / _\` | '_ \\ / _\` | '__| | '_ \\ / _ \\ 
    ____) | (_| | | | | (_| | |  | | | | | (_) |
   |_____/ \\__,_|_| |_|\\__,_|_|  |_|_| |_|\\___/   
    `;
  }
}

/**
 * List of available fonts for ASCII art
 * These are the most common figlet fonts
 */
export const availableFonts = [
  'Standard',
  'Slant',
  'ANSI Shadow',
  'Small',
  'Big',
  'Block',
  'Banner',
  'Doom',
  'Ivrit',
  'Script',
  'Shadow',
  'Digital',
  'Mini',
  'Graffiti'
];
