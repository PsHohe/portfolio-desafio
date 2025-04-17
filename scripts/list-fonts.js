/**
 * This script lists all available fonts from the figlet package
 * Run with: node scripts/list-fonts.js
 */

import figlet from 'figlet';

// Function to list all available fonts
function listFonts() {
  try {
    // Get the list of fonts
    const fonts = figlet.fontsSync();

    console.log('Available ASCII Art Fonts:');
    console.log('=========================');

    // Print each font name
    fonts.forEach((font, index) => {
      console.log(`${index + 1}. ${font}`);
    });

    console.log('\nTotal fonts available:', fonts.length);
    console.log('\nTo use a font, update your config/personal.yml file:');
    console.log(`
ascii-art:
  text: "Your Text"
  font: "font_name"
`);

    // Show an example
    console.log('\nExample with Standard font:');
    console.log(figlet.textSync('Hello!', { font: 'Standard' }));

    console.log('\nExample with Slant font:');
    console.log(figlet.textSync('Hello!', { font: 'Slant' }));

  } catch (error) {
    console.error('Error listing fonts:', error);
  }
}

// Run the function
listFonts();
