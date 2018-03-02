

import {ifElse,type,isEmpty,F,or,isNil} from 'ramda';
import fp from 'lodash/fp'




const returnEmpty = item => 'Empty';

const OtherType = item => ifElse(isNil,returnEmpty,type)(item);

export const getTypeOf = ifElse(isEmpty, returnEmpty, OtherType);




const isObjectOrFunction =(item) => or(getTypeOf(item)==='Function',getTypeOf(item)==='Object')

const hasThenFunction = (item) => fp.isFunction(item.then)

export const isPromise = ifElse(isObjectOrFunction, hasThenFunction,F)




