    /**
    * k means algorithm
    * @param data
    * @param k
    * @return {Object}
    */
   
    function kmeans(data, k) 
    {
        
        var quality = 0;
        var newQuality = 0;
        var iterate = false;
        // set initial max/min values
        var aMaxData = data[0]["A"];
        var bMaxData = data[0]["B"];
        var cMaxData = data[0]["C"];
        var aMinData = data[0]["A"];
        var bMinData = data[0]["B"];
        var cMinData = data[0]["C"];

        
        for (var i = 1; i < data.length; i++)
        {
            aMaxData = Math.max(data[i]["A"], aMaxData);
            bMaxData = Math.max(data[i]["B"], bMaxData);
            cMaxData = Math.max(data[i]["C"], cMaxData);
            aMinData = Math.min(data[i]["A"], aMinData);
            bMinData = Math.min(data[i]["B"], bMinData);
            cMinData = Math.min(data[i]["C"], cMinData);
        }        
        
        var listOfRandoms = [];
        // Step 1
        for (var i = 0; i < k; i++)
        {
            var random = [(Math.random() * aMaxData) + aMinData,
                            (Math.random() * bMaxData) + bMinData,
                            (Math.random() * cMaxData) + cMinData];
            listOfRandoms.push(random);
        }
        

        //assign to cluster
        var distance;
        var distanceArray;
        var minArray = [];
        //var counter = 0;
        var minVal;
        var bestCentroidIndexArray = [];
        var newCentroids = [];
        var iterations = 0;
        do
        {
            var distance;
            var distanceArray;
            var minArray = [];

            var minVal;
            var bestCentroidIndexArray = [];

            // Step 2
            if (iterations < 1)
            {
                for (var i = 0; i < data.length; i++)
                {
                    distance = 0;
                    distanceArray = [];
                    for (var j = 0; j < k; j++)
                    {
                        distance = (Math.pow(parseFloat(data[i]["A"]) - listOfRandoms[j][0], 2)) +
                                    (Math.pow(parseFloat(data[i]["B"]) - listOfRandoms[j][1], 2)) + 
                                    (Math.pow(parseFloat(data[i]["C"]) - listOfRandoms[j][2], 2));
                        distanceArray.push(Math.sqrt(distance));
                       
                    }
                    console.log(distanceArray);
                    // save the index of the best centroid.
                    // the value will correspond to the index in the random array.
                    bestCentroidIndexArray.push(distanceArray.indexOf(Math.min.apply(Math, distanceArray)));
                    distance = 0;
                    distanceArray = [];
                    
                }
                console.log(bestCentroidIndexArray);
            }
            else
            {
                for (var i = 0; i < data.length; i++)
                {
                    distance = 0;
                    distanceArray = [];
                    for (var j = 0; j < newCentroids.length; j++)
                    {
                      //  console.log(newCentroids);
                        distance = (Math.pow(parseFloat(data[i]["A"]) -  newCentroids[j][0], 2)) +
                                    (Math.pow(parseFloat(data[i]["B"]) - newCentroids[j][1], 2)) + 
                                    (Math.pow(parseFloat(data[i]["C"]) - newCentroids[j][2], 2));
                        distanceArray.push(Math.sqrt(distance));
                        
                    }

                    //console.log(distanceArray);
                    // save the index of the best cluster.
                    // the value will correspond to the index in the random array.
                   // console.log(distance);
                  // console.log(distanceArray);
                    bestCentroidIndexArray.push(distanceArray.indexOf(Math.min.apply(Math, distanceArray)));
                    //console.log(distanceArray);
                    distance = 0;
                    distanceArray = [];

                }
            }
           // console.log(newCentroids);
            //console.log(bestCentroidIndexArray);
       
            
            // Step 3

            /* recalculate centroids by computing the average of all data points 
               assigned to each centroid */
            var avgA = [];
            var avgB = [];
            
            var avgC = [];
            var counter = [];


            var count = 0;
           // console.log(bestCentroidIndexArray);
            for (var i = 0; i < bestCentroidIndexArray.length; i++)
            {
                if (bestCentroidIndexArray.includes(i))
                {
                    count++;
                    console.log("HEJJJJJ");
                }
            }
            //console.log(count);
            for (var i = 0; i < count; i++)
            {
                counter.push(0);
                avgA.push(0);
                avgB.push(0);
                avgC.push(0);

            }

            newCentroids = [];
            //console.log(bestCentroidIndexArray);
            //console.log(counter);
            for (var i = 0; i < bestCentroidIndexArray.length; i++)
            {
                
                avgA[bestCentroidIndexArray[i]] += parseFloat(data[i]["A"]);
                avgB[bestCentroidIndexArray[i]] += parseFloat(data[i]["B"]);
                avgC[bestCentroidIndexArray[i]] += parseFloat(data[i]["C"]);
                counter[bestCentroidIndexArray[i]] = counter[bestCentroidIndexArray[i]] + 1;
                
                if (i == bestCentroidIndexArray.length - 1)
                {

                    for (var j = 0; j < counter.length; j++)
                    {
                            avgA[j] = avgA[j]/counter[j];
                            avgB[j] = avgB[j]/counter[j];
                            avgC[j] = avgC[j]/counter[j];
                        

                        newCentroids.push([avgA[j], avgB[j], avgC[j]]);
                        //console.log(newCentroids);
                      // console.log(newCentroids);
                        
                    }
                        //console.log(counter);
                        


                }
            }          
            //console.log(newCentroids);

            // Step 4
            var qualityArray = [];
        
        
            for (var i = 0; i < bestCentroidIndexArray.length; i++)
            {
                if (iterations == 0)
                {
                   // console.log(newCentroids);
                   // console.log("HEJ");
                    quality += Math.pow(parseFloat(data[i]["A"]) - 
                    newCentroids[bestCentroidIndexArray[i]][0], 2) + 
                    Math.pow(parseFloat(data[i]["B"]) - 
                    newCentroids[bestCentroidIndexArray[i]][1], 2) + 
                    Math.pow(parseFloat(data[i]["C"]) -
                    newCentroids[bestCentroidIndexArray[i]][2], 2);
                    iterate = true;
                    if (i == bestCentroidIndexArray.length -1)
                    {
                        iterations++;
                    }
                    //console.log(quality);
                    
                }
                else
                {
                   // console.log("TJU");
                    
                    newQuality += Math.pow(parseFloat(data[i]["A"]) - 
                    newCentroids[bestCentroidIndexArray[i]][0], 2) + 
                    Math.pow(parseFloat(data[i]["B"]) - 
                    newCentroids[bestCentroidIndexArray[i]][1], 2) + 
                    Math.pow(parseFloat(data[i]["C"]) -
                    newCentroids[bestCentroidIndexArray[i]][2], 2);
                    if (i == bestCentroidIndexArray.length -1)
                    {
                        iterations++;
                    }
                }
            }
           /* console.log(quality);
            console.log(newQuality);*/
            if (iterations <= 1)
            {
                iterate = true;
            }
            else if (iterations > 1 && newQuality < quality)
            {
                iterate = true;
                quality = newQuality;
            }
            else if (iterations > 1 && newQuality >= quality)
            {
                iterate = false;
            }

            //console.log(newCentroids);
        }while(iterate);



   
        
       






    };