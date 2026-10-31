import { buildDeck } from './generate_pptx.js';
import fs from 'fs';
import path from 'path';

async function main() {
  console.log('Building GapLens Pitch Deck presentation...');
  const pptx = buildDeck();
  
  const publicDir = path.resolve('public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  const rootOutput = 'GapLens_Hackathon_Pitch_Deck.pptx';
  const publicOutput = path.join(publicDir, 'GapLens_Hackathon_Pitch_Deck.pptx');

  await pptx.writeFile({ fileName: rootOutput });
  console.log(`Saved PPTX to ${rootOutput}`);

  await pptx.writeFile({ fileName: publicOutput });
  console.log(`Saved PPTX to ${publicOutput}`);
}

main().catch(err => {
  console.error('Error generating PPTX:', err);
  process.exit(1);
});
