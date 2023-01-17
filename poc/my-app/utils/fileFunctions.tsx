import * as fs from 'fs';

function getColumn(filepath: string, columnIndex: number): string[] {
  const data = fs.readFileSync(filepath, 'utf8');
  const lines = data.split('\n');
  const firstColumn: string[] = [];

  for (let i = 0; i < lines.length; i++) {
    const cells = lines[i].split(',');
    if(cells.length > 0)
    firstColumn.push(cells[columnIndex]);
  }
  return firstColumn;
}

export default getColumn;