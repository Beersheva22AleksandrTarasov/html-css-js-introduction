function moveElement(array, position, shift) {
    let newPosition = position + shift;
  
    if (newPosition >= array.length) {
     newPosition = array.length }
  
    if (newPosition < 0) {
      newPosition = 0 }
     
    const element = array.splice(position, 1)[0];
    
    array.splice(newPosition, 0, element);
    
    return array;
  }
  
  
  const arr = [1, 2, 3, 4, 5];
  console.log(moveElement(arr, 1, 2))