export function deleteLocation(id) {
  return (dispatch) => {
    const data = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Accept': "application/json"
      }
    }
    fetch(`http://192.168.3.40:3000/api/v1/locations/${id}`, data)
      .then(res => res.json())
      .then(response => {
        if (response.success) {
          dispatch({ type: 'UPDATED_LIST', payload: id })
        } else {
          Alert.alert("An error occured", "Please try again")
        }
      })
      .catch(error => console.log("Error at deleteLocation", error))
  }
}
