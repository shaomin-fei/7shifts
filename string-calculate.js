/*
 * @Description: 
 * @version: 1.0
 * @Author: shaomin fei
 * @Date: 2020-11-02 23:11:03
 * @LastEditors: shaomin fei
 */
//@ts-check
/**
 * @Date: 2020-11-02 23:13:34
 * @Description: 
 * @param {string} inputString
 * @return {Number}
 */
function Add(inputString){
    let result=0;
    try{
        if(inputString===''||inputString===null||inputString===undefined){
            return result;
        }
        if(inputString.indexOf('\n')>=0){
            const reg= /\/\/\D*\n/g;
            const temp=reg.exec(inputString);
            result= temp?handleDelimiter(inputString,temp):handleOnlyN(inputString);
            
        }else{
            result=handleOnlyNumber(inputString);
        }
    }catch(exception){
        throw new Error(exception);
    }
    return result;
}
/**
 * @Date: 2020-11-03 00:01:35
 * @Description: 
 * @param {string} inputString
 * @param {Array<string>} regResult
 * @return {Number}
 */
function handleDelimiter(inputString,regResult){
    const delimitersLen=regResult[0].length;
    const szSplitter=regResult[0].substring(2,delimitersLen-1).split(',');
    const calculateString=inputString.substring(delimitersLen,inputString.length);
    const regSplit="["+szSplitter.join(",")+"]";
    return calculate(calculateString,new RegExp(regSplit));
}
/**
 * @Date: 2020-11-03 00:21:01
 * @Description: 
 * @param {string} inputString
 * @return {Number}
 */
function handleOnlyN(inputString){
    const newInput=inputString.replace('\n','');
    const regSplit="[,]";
    return calculate(newInput,new RegExp(regSplit));
}
function handleOnlyNumber(inputString){
    const regSplit="[,]";
    return calculate(inputString,new RegExp(regSplit));
}
/**
 * @Date: 2020-11-03 00:04:26
 * @Description: 
 * @param {string} pureString
 * @param {RegExp} regExpress
 * @return {Number}
 */
function calculate(pureString,regExpress){
    let data=pureString.split(regExpress);
    data=data.filter(dt=>{
        return dt!='';
    });
    const illegalNumber=[];
    const minusNumber=[];
    let result=0;
    for(let i=0;i<data.length;i++){
        //@ts-ignore
        if(isNaN(data[i])){
            illegalNumber.push(data[i]);
        }
        const temp=parseFloat(data[i]);
        if(temp>1000){
            continue;
        }
        if(temp<0){
            minusNumber.push(temp);
            continue;
        }
        result+=temp;
    }
    let illegal='';
    if(illegalNumber.length>0){
        const illegalNumbers=illegalNumber.join(",");
        illegal=`Illegal numbers:${illegalNumbers}`;
    }
    if(minusNumber.length>0){
        const numbers=minusNumber.join(',');
        const error=`Negatives not allowed:${numbers}.${illegal}`;
        throw error;
    }
    return result;
}

module.exports=Add;
let result=0;
const continueCharacter=`//***\n1***2***3***-1`;
try{
    result=Add(continueCharacter);
}catch(err){
    console.log(err);
}
 
// const withNegative=`//@\n2@3@8@-100@-1.5`;
// result=Add(withNegative);
 //const testMultiDel=`//$,@\n1$2@3`;
//result=Add(testMultiDel);
//let testHaveOneDel=`//$\n1$2$3`;
//result=Add(testHaveOneDel);
//testHaveOneDel=`//@\n2@3@8`;
//result=Add(testHaveOneDel);
// const testMultiDel=`//$,@\n1$2@3`;
// let result=Add(testMultiDel);

// const testOnlyNumber=`1,2,3`;
// result=Add(testOnlyNumber);
// const testOnlyHaveN=`1\n,2,3`;
// result=Add(testOnlyHaveN);


