const calc={id:'lean-bw-james',name:'Lean Body Weight â€” James',shortName:'James LBW',categoryId: 'general-medicine',description:'Lean body weight using the James equation.',type:'calculation',
inputs:[{id:'sex',label:'Sex',type:'choice',options:[{value:'male',label:'Male'},{value:'female',label:'Female'}]},{id:'weight',label:'Weight',unit:'kg',min:1,max:300,step:0.1},{id:'height',label:'Height',unit:'cm',min:100,max:250,step:0.1}],
calculate(v){const w=+v.weight,h=+v.height;const value=v.sex==='male'?(1.1*w)-(128*(w*w)/(h*h)):(1.07*w)-(148*(w*w)/(h*h));return{value,unit:'kg'}}
};export default calc

