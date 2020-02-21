import Vue from 'vue';
import { Tabbar, Grid, GridItem,Image,Overlay,Uploader, TabbarItem,NavBar,Swipe, Step, Steps,Button,
    SwipeItem,Search,DropdownMenu, DropdownItem ,Icon,Divider,Field, RadioGroup, Radio,Popup,Tab, Tabs,Cell, CellGroup,Dialog,AddressList,Toast,AddressEdit   } from 'vant';

Vue.use(Tabbar).use(Grid).use(GridItem).use(TabbarItem).use(Overlay).use(NavBar).use(Swipe).use(Uploader).use(Toast).use(Step).use(Steps)
    .use(Image).use(Cell).use(CellGroup).use(Dialog).use(AddressList).use(AddressEdit).use(Button)
    .use(SwipeItem).use(Icon).use(Divider).use(Field).use(Popup).use(Tab).use(Tabs)
    .use(Radio).use(RadioGroup).use(Search).use(DropdownItem).use(DropdownMenu);