    /**
    * k means algorithm
    * @param data
    * @param k
    * @return {Object}
    */
   
    function kmeans(data, k) 
    {
    	// set initial max/min values
    	var aMaxData = data[0]["A"];
    	var bMaxData = data[0]["B"];
    	var cMaxData = data[0]["C"];
    	var aMinData = data[0]["A"];
    	var bMinData = data[0]["B"];
    	var cMinData = data[0]["C"];

    	//console.log(data);
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
    	//console.log(listOfRandoms);

    	//assign to cluster
    	var distance;
    	var distanceArray;
    	var minArray = [];

    	var minVal;
    	var bestClusterIndexArray = [];
    	//console.log(listOfRandoms[1][1]);
    	// Step 2
    	for (var i = 0; i < data.length; i++)
    	{
    		distance = 0;
    		distanceArray = [];
    		for (var j = 0; j < k; j++)
    		{
    			distance = (Math.pow(data[i]["A"] - listOfRandoms[j][0], 2)) +
    						(Math.pow(data[i]["B"] - listOfRandoms[j][1], 2)) + 
    						(Math.pow(data[i]["C"] - listOfRandoms[j][2], 2));
    			distanceArray.push(Math.sqrt(distance));
    		}
    		// save the index of the best cluster.
    		// the index will correspond to the index in the random array.
    		bestClusterIndexArray.push(distanceArray.indexOf(Math.min.apply(Math, distanceArray)));
    		distance = 0;
    		distanceArray = [];
    	}
    	console.log(bestClusterIndexArray);   

    	// Step 3
    	for (var i = 0; i < data.length; i++)
    	{
    		
    	}     



    };


    
    