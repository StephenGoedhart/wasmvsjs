sf_mean = (arr) => {
    mean_sum = 0
    arr.forEach(element => {
        mean_sum += element;
    });
    return mean_sum != 0 ? mean_sum / arr.length : 0;
}

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

sf_variance = (arr, mean) => {
    var sd_sum = 0
    arr.forEach(element => {
        v = (element - mean) // substract mean from every datapoint.
        sd_sum += v * v; // We don't square v because this is only done to make sure the value is positive. Math.abs does this for us. 
    });
    return sd_sum != 0 ? sd_sum / (arr.length - 1) : 0
}

sf_t_test = (meanA, meanB, arrA, arrB) => {
    sumA2 = 0
    sumB2 = 0

    arrA.forEach(elementA => {
        sumA2 += elementA * elementA;
    });

    arrB.forEach(elementB => {
        sumB2 += elementB * elementB;
    });

    sumA2sqrt = sumA2 * sumA2;
    sumB2sqrt  = sumB2 * sumB2;

    A = sumA2 - (sumA2sqrt / arrA.length);
    B = sumB2 - (sumB2sqrt / arrB.length);

    part1 = (A + B) / arrA.length + arrB.length - 2;
    part2 = part1 * ((1 / arrA.length) + (1 / arrB.length))
    part3 = (meanA - meanB) / Math.sqrt(part2);

    return part3;
}