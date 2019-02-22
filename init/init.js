const { mongoose } = require('./../db/mongoose');
const { ProductType } = require('./../models/product-type');
const { Product } = require('./../models/product');
const { Text } = require('./../models/text');

mongoose.connection.collections['texts'].drop(err => console.log(err ? err : 'Dropped \\texts\\'));
mongoose.connection.collections['products'].drop(err => console.log(err ? err : 'Dropped \\products\\'));
mongoose.connection.collections['producttypes'].drop(err => console.log(err ? err : 'Dropped \\producttypes\\'));

const productTypes = [ 'Book', 'Movie', 'Serie' ];
const products = [ 
    { name: 'Rich Dad Poor Dad', author: 'Robert T. Kiyosaki', typeName: 'Book' },
    { name: 'The Power of Habit', author: 'Charles Duhigg', typeName: 'Book' },
    { name: 'Shoe Dog', author: 'Phil Knight', typeName: 'Book' },
    { name: 'What Every BODY is Saying', author: 'Joe Navarro', typeName: 'Book' }
];
const texts = [
    { productName: 'Rich Dad Poor Dad', text: `After you've taken the time and invested in and built your own business, you are now ready to learn the biggest secret of the rich - the secret that puts the rich way ahead of the pack.` },
    { productName: 'Rich Dad Poor Dad', text: `To become financially secure, a person needs to mind their own business. Your business revolves around your asset column, not your income column. As stated earlier, the number-one rule is to know the difference between an asset and a liability, and to buy assets.` },
    { productName: 'Rich Dad Poor Dad', text: `Instead, I recommend to young people to seek work for what they will learn, more than what they will earn. Look down the road at what skills they want to acquire before choosing a specific profession and before getting trapped in the Rat Race.` },
    { productName: 'The Power of Habit', text: `So what, exactly, did Hopkins do? He created a craving. And that craving, it turns out, is what makes cues and rewards work. That craving is what powers the habit loop.` },
    { productName: 'The Power of Habit', text: `That's the rule: If you use the same cue, and provide the same reward, you can shift the routine and change the habit. Almost any behavior can be transformed if the cue and reward stay the same.` },
];

for (let productType of productTypes) {
    new ProductType({ name: productType })
        .save()
        .then((newProductType) => {
            for (let product of products.filter(p => p.typeName === newProductType.name )) {
                new Product({ name: product.name, author: product.author, productType: newProductType._id })
                    .save()
                    .then((newProduct) => {
                        for (let text of texts.filter(t => t.productName === newProduct.name)) {
                            new Text({ text: text.text, product: newProduct._id })
                                .save()
                                .then((newText) => {
                                    // console.log(newText);
                                });
                        } 
                    });
            }
        });
}