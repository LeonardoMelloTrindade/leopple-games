module.exports = {
  // Uma função aqui impede que os caminhos dos arquivos sejam concatenados ao comando final.
  // Assim garantimos que o Turborepo vai rodar pelo cache no monorepo todo!
  "*.{ts,vue,svelte,tsx}": () => "npm run lint"
};
