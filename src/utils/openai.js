import OpenAI from 'openai';
import {OPENAI_KEY} from './constant';

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_KEY,
  dangerouslyAllowBrowser: true,
   // This is the default and can be omitted
});




export default openai;

