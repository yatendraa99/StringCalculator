class StringCalculator {
  constructor() {
    this.callCount = 0;  
  }

  Add(numbers) {
    this.callCount++;

    if (numbers === "") {
      return 0;
    }

    let delimiters = [",", "\n"];

    if (numbers.startsWith("//")) {
      const delimiterEndIndex = numbers.indexOf("\n");
      const delimiterString = numbers.substring(2, delimiterEndIndex);

      delimiters = delimiterString.match(/\[([^\]]+)\]/g) 
        ? delimiterString.match(/\[([^\]]+)\]/g).map(d => d.slice(1, -1))
        : [delimiterString];

      numbers = numbers.substring(delimiterEndIndex + 1); 
    }

    const numberArray = this.splitNumbers(numbers, delimiters);

    const negativeNumbers = numberArray.filter(n => n < 0);
    if (negativeNumbers.length > 0) {
      throw new Error(`Negatives not allowed: ${negativeNumbers.join(", ")}`);
    }

    return numberArray
      .filter(n => n <= 1000)
      .reduce((sum, n) => sum + n, 0);
  }

  splitNumbers(numbers, delimiters) {
    const delimiterRegex = new RegExp(`[${delimiters.map(d => d.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('')}]`);
    return numbers.split(delimiterRegex).map(Number); 
  }

  GetCalledCount() {
    return this.callCount;
  }
}

const calculator = new StringCalculator();

try {
  console.log(calculator.Add(""));               
  console.log(calculator.Add("1,2"));            
  console.log(calculator.Add("1\n2,3"));         
  console.log(calculator.Add("//;\n1;2;3"));     
  console.log(calculator.Add("//[***]\n1***2***3")); 
  console.log(calculator.GetCalledCount());     
} catch (error) {
  console.error(error.message); 
}
