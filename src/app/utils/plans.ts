export interface planI{
    type:string ,
    price: string,
    features: Array<string>,
    paymentLink:string,
}
export const plans = [
    {
      type:'Monthly' ,
      price: '199 INR',
      features: ['100 urls/mo'],
      paymentLink:'https://buy.stripe.com/test_28oaGY2s0dLj0k83ce?client_reference_id='
    },
    {
        type:'Yearly' ,
        price: '799 INR',
        features: ['1500 urls/yr'],
        paymentLink:'https://buy.stripe.com/test_7sI8yQfeM4aJc2QcMP?client_reference_id='
    }
];