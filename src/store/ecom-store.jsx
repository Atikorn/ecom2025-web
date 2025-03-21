import axios from "axios";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { listCategory } from "../api/Category";
import { listProduct, searchFilters,ProductsByModels,searchModels,ModelByCategorys } from "../api/product";
import _, { invoke, method } from "lodash";
import { listModel } from "../api/model";

const ecomStore = (set, get) => ({
  user: null,
  token: null,
  address: [],
  selectedAddress: [],
  categories: [],
  products: [],
  carts: [],
  shipping:{},
  receipt:[],
  method:{},
  
  // modelData: [], //Latest Edited
  // modelsByCategory: {}, //Latest Edited
  // productsByModel: {}, //Latest Edited
  logout: () => {
    set({
      user: null,
      token: null,
      address: [],
      selectedAddress: [],
      // categories: [],
      carts: [],
      shipping:{},
      receipt:[],
      method:{},
      // modelData: [], //Latest Edited
      // modelsByCategory: {}, //Latest Edited
      // productsByModel: {}, //Latest Edited
    });
  },
  actionReceipt:(receipt)=>{
    set({receipt:receipt})
      },
  // actionGetShipping:(shipping) =>{
  //   set({shipping:shipping});
 // console.log("เห้ยมาว่ะ Shipping อ่ะ",shipping)
  // },
  actionGetShipping:(shipping,method) =>{
    set((state)=> ({
      shipping:shipping,
      method:method
    }))
    // console.log(shipping,method)
  },
  actionSelectedAddress: (selectedAddress) => {
    set({ selectedAddress: selectedAddress });
    // console.log(selectedAddress)
  },
  // actionSelectedAddress: (item) => {
  //   const selectAddress = get().selectedAddress

  //  console.log('เห้ยมาว่ะ',selectAddress)
  // },

  actionAddtoCart: (product) => {
    const carts = get().carts;
    const updateCart = [...carts, { ...product, count: 1 }];

    // Step Uniqe
    const uniqe = _.unionWith(updateCart, _.isEqual);
    // console.log("uniqe", uniqe);

    set({ carts: uniqe });
  },
  actionUpdateQuantity: (productId, newQuantity) => {
    // console.log('Update Clikkkkk',productId,newQuantity)
    set((state) => ({
      carts: state.carts.map((item) =>
        item.id === productId
          ? { ...item, count: Math.max(1, newQuantity) }
          : item
      ),
    }));
  },
  actionRemoveProduct: (productId) => {
    //console.log('remove จ้าาาาาาาาาาา',productId)
    set((state) => ({
      carts: state.carts.filter((item) => item.id !== productId),
    }));
  },
  getTotalPrice: () => {
    return get().carts.reduce((total, item) => {
      return total + item.price * item.count;
    }, 0);
  },

  actionLogin: async (form) => {
    const res = await axios.post("https://ecom2025-api-ecru.vercel.app/api/login", form);
    set({
      user: res.data.payload,
      token: res.data.token,
    });
    return res;
  },
  getCategory: async () => {
    try {
      const res = await listCategory();
      set({ categories: res.data });
    } catch (err) {
      console.log(err);
    }
  },
  getProduct: async (count) => {
    try {
      const res = await listProduct(count);
      set({ products: res.data });
    } catch (err) {
      console.log(err);
    }
  },
  getAddress: async () => {
    try {
      const res = await getAddressUsers(get().token);
      set({ address: res.data });
    } catch (err) {
      console.log(err);
    }
  },
  actionSearchFiltersProducts: async (arg) => {
    try {
      const res = await searchFilters(arg);
      set({ products: res.data });
    } catch (err) {
      console.log(err);
    }
  },
  getModel: async () => { 
    try {
        const res = await listModel()
        set({ modelData: res.data })
    } catch (err) {
        console.log(err)
    }
},
actionSearchModels: async (arg) => {
  try {
      const res = await searchModels(arg)
      set({ products: res.data })
  } catch (err) {
      console.log(err)
  }
}, //Latest Edited
getModelsByCategory: async (categoryId) => {
  try {
      const res = await ModelByCategorys(categoryId)
      set({ modelsByCategory: res.data })
  } catch (err) {
      console.log(err)
  }
}, //Latest Edited
getProductsByModel: async (modelsId) => {
  try {
      const res = await ProductsByModels(modelsId)
      set({ productsByModel: res.data })
  } catch (err) {
      console.log(err)
  }
},



  // actionSearchFiltersEmail: async (arg) => {
  //   try {
  //     const res = await searchFiltersEmail(arg);
  //     set({ email: res.data });
  //   } catch (err) {
  //     console.log(err);
  //   }
  // },
  clearCart: () => set({ carts: [] }),
});


const usePersist = {
  name: "ecom-store",
  storage: createJSONStorage(() => localStorage),
};

const useEcomstore = create(persist(ecomStore, usePersist));

export default useEcomstore;
