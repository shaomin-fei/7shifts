/*
 * @Description: 
 * @version: 1.0
 * @Author: shaomin fei
 * @Date: 2020-11-03 00:31:13
 * @LastEditors: shaomin fei
 */
const Add=require('./string-calculate');
test('add test',()=>{
    expect(Add(`1,2,3`)).toBe(6);
    expect(Add(`1\n,2,3`)).toBe(6);
    expect(Add(`1\n,\n2,3`)).toBe(6);
    expect(Add(`//@\n2@3@8`)).toBe(13);
    expect(Add(`//$\n1$2$3`)).toBe(6);
    expect(Add(`//$,@\n1$2@3`)).toBe(6);
    expect(Add(`//***\n1***2***3`)).toBe(6);
    expect(Add(`//***,@\n1***2***3@2***1@2`)).toBe(11);
    expect(Add(`//***,@\n1***2***3@2***1@2@1001***2001`)).toBe(11);
    expect(Add(`//*$*,@\n1*$*2*$*3@2*$*1@2@1001***2001`)).toBe(11);
    expect(()=>Add(`//@\n2@3@8@-100@-1.5`)).toThrow('Negatives not allowed:-100,-1.5.');
    expect(()=>Add(`//@\n2@3@8f@-100@-1.5`)).toThrow('Negatives not allowed:-100,-1.5.Illegal numbers:8f');
    
});
