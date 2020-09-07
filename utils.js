module.exports = {
  age: function age(timestamp) {
    const currentDate = new Date()
    const birthDate = new Date(timestamp)

    let age = currentDate.getUTCFullYear() - birthDate.getUTCFullYear()
    let month = currentDate.getUTCMonth() - birthDate.getUTCMonth()

    if (month < 0 || month == 0 && currentDate.getUTCDate() < birthDate.getUTCDate()) {
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
  }, 
  date: function date(timestamp) {
    const date = new Date(timestamp)

    let year = date.getUTCFullYear()
    let month = `0${date.getUTCMonth() + 1}`.slice(-2)
    let day = `0${date.getUTCDate()}`.slice(-2)

    iso = `${year}-${month}-${day}`

    return iso

  },
  experience: function experience(timeExperience) {
    const time = timeExperience

    switch(time) {
      case "0-12":
      return "0 a 12 meses";
      break;
      case "1-2":
      return "1 a 2 anos";
      break;
      case "2-5":
      return "2 a 5 anos";
      break;
      case "5+":
      return "5 anos ou +";
      break;
    }
  }
}