export function checkNumber(value){
    let check_number =  /[0-9]/.test(value);
    let countNumber =  value.replace(/[^0-9]/g, '').length;
 if(check_number && countNumber > 10){
    return true
 }else{
    return false
 }
}