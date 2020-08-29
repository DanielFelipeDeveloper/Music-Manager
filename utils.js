module.exports = {
  age: function age(timestamp) {
    const currentDate = new Date()
    const birthDate = new Date(timestamp)

    let age = currentDate.getFullYear() - birthDate.getFullYear()
    let day = currentDate.getDate() - birthDate.getDate()
    let month = currentDate.getMonth() - birthDate.getMonth()

    if (month < 0 || month == 0 || day < 0) {
      age = age - 1
    }
    
    return age
  },
  daw: function daw(selectedDaw) {
    const daw = selectedDaw

    switch (daw) {
      case 'fl':
      return 'FL Studio';
      break;
      case 'ableton':
      return 'Ableton Live';
      break;
      case 'protools':
      return 'Pro Tools';
      break;
      case 'logic':
      return 'Logic Pro';
      break;
      case 'reaper':
      return 'Reaper';
      break;
      case 'studio':
      return 'Studio One 3';
      break;
    
    }
  }
}