const shortCodeGenerator = (fullName) => {
  const names = fullName.split(' ');
  let initials = '';
  for (let i = 0; i < names.length; i++) {
    const name = names[i];
    initials += name.charAt(0).toUpperCase();
  }
  return initials;
}

module.exports = shortCodeGenerator