// Sum elements and devide them by the number of elements.
sf_mean = (arr) => {
    mean_sum = 0
    arr.forEach(element => {
        mean_sum += element;
    });
    return mean_sum != 0 ? mean_sum / arr.length : 0;
}

// Uneven = return the center element.
// Even = return the 2 center elements, add and devide them by 2. 
sf_median = (arr) => {
    if(arr.length % 2 == 0){
        var x1 = arr.length / 2 - 1;
        var x2 = arr.length / 2
        return((arr[x1] + arr[x2]) / 2)
    }else{
        var x1 = parseInt(arr.length / 2)
        return(arr[x1]);
    }
}

// Measures how far values are seperated. The square root of the variance is the standard deviation.
sf_variance = (arr, mean) => {
    var sd_sum = 0
    arr.forEach(element => {
        v = (element - mean) // substract mean from every datapoint.
        sd_sum += v * v; // Square value to be sure the value is positive. 
    });
    return sd_sum != 0 ? sd_sum / (arr.length - 1) : 0
}

// The t test is a big 
sf_t_test = (squared_sumA, squared_sumB, sumA_squared, sumB_squared, meanA, meanB, nA, nB) => {
    console.log("Step 1: Calculate the squared sum of A and B: ", squared_sumA, squared_sumB);
    divA = sumA_squared / nA;
    divB = sumB_squared / nB;
    console.log("Step 2: devide " + sumA_squared + " by " + nA, " and " + sumB_squared + " by " + nB + ": ", divA, "|" ,divB);
    calcA = squared_sumA - divA;
    calcB = squared_sumB - divB;
    console.log("Step 3: substract "+divA+" number from "+squared_sumA+" and " +divB + " from " + squared_sumB +" respectively:" , calcA, calcB);
    ABN1 = (calcA + calcB) / (nA + nB - 2);
    console.log("Step 4: devide the sum of " + calcA + " and " + calcB + " by " + nA + " + " + nB + " - 2:", ABN1);
    fractal = 1/nA + 1/nB;
    console.log("Step 5: Adding 1 / " + nA + " + 1 / "+nB+":", fractal);
    ABN2 = ABN1 * fractal;
    console.log("Step 6: Multiplying "+ ABN1 +" with " + fractal + ":", ABN2);
    ABNSQRT = Math.sqrt(ABN2);
    console.log("Step 7: Get the square root of " + ABN2 + ": ", ABNSQRT);
    t = (meanA - meanB) / Math.sqrt(ABN2);
    console.log("Step 8: The T score is " + ABN2 + " / (mean A " + meanA + " - " + "meanB" + meanB + "): ", t);
    return t;
}