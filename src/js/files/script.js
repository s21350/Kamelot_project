// Підключення функціоналу "Чертоги Фрілансера"
import { isMobile } from "./functions.js";
// Підключення списку активних модулів
import { flsModules } from "./modules.js";

const $openFilter = document.querySelector(".open-filter");

if ($openFilter) {
   document.getElementById('open-filter').onclick = function () {
      document.getElementById('krovlya-filter').classList.add('filter-open');
      document.querySelector('html').classList.add('lock');

   }
}
const $closeFilter = document.querySelector(".close-filter__btn");
if ($closeFilter) {
   document.getElementById('close-filter__btn').onclick = function () {
      document.getElementById('krovlya-filter').classList.remove('filter-open');
      document.querySelector('html').classList.remove('lock');
   }

}


