const heap = require('heap');

const go = document.getElementById('go');
const reset = document.getElementById('reset');
const userinput = document.getElementById("userInput");
const output = document.getElementById("output");

let minHeap = [];
let maxHeap = [];
let total = 0;
let sum = 0;

const insert = (num) => {
    // Maintain sum for mean computation
    sum += parseInt(num);

    // Maintain total for the count of inputs
    if (total % 2 === 0) {
      // If this is an even element add it to maxHeap
      heap.push(maxHeap, -1 * num);
      total++;
  
      if (minHeap.length === 0) {
        return;
      }
  
      // If maxHeap's root became greater than minHeap's root then swap the roots
      if (-1 * maxHeap[0] > minHeap[0]) {
        toMin = -1 * heap.pop(maxHeap);
        toMax = -1 * heap.pop(minHeap);
        heap.push(maxHeap, toMax);
        heap.push(minHeap, toMin);
      }
    } else {
      // If this is an even element add it to max head. Then pop the lowest element
      // and add it to the min heap
      var toMin = -1 * heap.pushpop(maxHeap, -1 * num);
      heap.push(minHeap, toMin);
      total++;
    }
  }
  
  const getMedian = () => {
    if (total % 2 === 0) {
      // If the number of elements is even then we need to get both roots and
      // divide them by two
      return (-1 * maxHeap[0] + minHeap[0]) / 2;
    } else {
      // If the number of elements is odd return the head of the max heap
      return -1 * maxHeap[0];
    }
  }
  
  const getMean = () => {
    return sum/total;
  }

go.addEventListener('click',()=>{
    if(userinput.value === ""){
      output.innerHTML = 'Please enter integer values!';
    }else{
      insert(userinput.value);
      output.innerHTML = `<div><p>Median: ${getMedian()}</p></div><div><p>Mean: ${getMean()}</p></div>`;
    }
});

reset.addEventListener('click',()=>{
    output.innerHTML = "";
    minHeap = [];
    maxHeap = [];
    total = 0;
    sum = 0;
    userinput.value="";
});

