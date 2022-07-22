
import { Conf } from "../core/conf";
import { MyDisplay } from "../core/myDisplay";
import { Param } from "../core/param";
import { Util } from "../libs/util";

// -----------------------------------------
//
// -----------------------------------------
export class Contents extends MyDisplay {

  private _img:Array<HTMLImageElement> = [];
  private _loadedImgNum:number = 0;
  private _imgNum:number = 13;
  private _isLoaded:boolean = false;

  constructor(opt:any) {
    super(opt)

    // 連番画像読み込み
    const tg = document.querySelector('.l-text > .inner') as HTMLElement;
    for(let i = 0; i < this._imgNum; i++) {
      const img = new Image();
      this._img.push(img);
      tg.append(img);

      img.onload = () => {
        this._eLoadedImg();
      }
      img.src = Conf.instance.PATH_IMG + 'img_' + i + '.png';
    }
  }


  private _eLoadedImg(): void {
    this._loadedImgNum++;
    if(this._loadedImgNum >= this._imgNum) {
      this._isLoaded = true;
    }
  }


  protected _update(): void {
    super._update();

    const zoomer = document.body.clientWidth / window.innerWidth;
    Param.instance.zoom = zoomer;



    if(this._isLoaded) {
      let rate = Util.instance.map(zoomer, 0, 1, 1, 2.5);
      // rate = Easing.instance.outExpo(rate);

      const now = ~~(Util.instance.map(rate, 0, this._img.length - 1, 0, 1));
      this._img.forEach((val,i) => {
        if(i == now) {
          val.classList.add('-show')
        } else {
          val.classList.remove('-show')
        }
      })
    }
  }
}