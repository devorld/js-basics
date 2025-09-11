/*
    ECMA Script:
function.[[Environment]] = ref to scope where was created

    Debug:
function.[[Scopes]] = array of refs to scopes where was created
*/

/*
    ECMA Script:
object.[[Prototype]] = ref to parent object


    JS Engines:
object.__proto__ = getter and setter for ref [[Prototype]] to parent object (we can: get and set)

    --    --    --    --    --

    Object.setPrototypeOf(this, parentObj)

    set __proto__(parentObj) {
        this.[[Prototype]] = parentObj;
    }

    --    --    --    --    --

    Object.getPrototypeOf(this);

    get __proto__() {
        return this.[[Prototype]];
    }

    --    --    --    --    --
*/


/*                                        .prototype

1)  F.prototype

    function CustomCtr() {
    }

                if we make

    CustomCtr.prototype = someObj; | or null

                and we

    const tmp = new CustomCtr();

                so what:

          tmp.[[Prototype]] === someObj


    --    --    --    --    --


2)    Object.prototype   <-- Object?.() {} это тоже функция кон-ор, поэтому у неё тоже заполнено поле .prototype

    это свойство кон-ора из API как обычно используется для хранения объекта с полем constructor и ссылкой на Object?.()
*/

/*      всяк_функцияFn, кроме () => {},
            имеют по умолчанию обычное свойство .prototype
                c объектом!
                    с одним свойством constructor
                        значением которого является фу-я конструктор
                            { constructor: всяк_функцииFn }
                                чтоб у экземпляров в [[Prototype]] класть { constructor: всяк_функцииFn }

        CustomCtr.prototype = {
            constructor: CustomCtr
        }

        const tmp1 = new CustomCtr();
        const tmp2 = tmp1.constructor();

 */

/* [[Code]] with function code
  func1 = func2.bind(ctx, arg1, arg2)

  func1.[[TargetFunction]] = func2
  func1.[[BoundThis]] = ctx
  func1.[[BoundArgs]] = arg1, arg2
*/
