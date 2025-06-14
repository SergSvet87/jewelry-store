export {
  handleAuthError,
  login,
  verifyPhoneLogin,
  verifyPhoneNumber,
  useRegister,
  refreshAccessToken,
  registerUser
} from './authService';

export {
  addToCartService,
  removeFromCartService,
  changeQuantityService,
  clearCartService
} from './cartService';

export {
  getAllProducts,
  getProductById,
  getProductBySku,
  deleteProductById,
  getFilteredProducts,
  getSearchProducts,
} from './productService';

export {
  getAllUsers,
  getUserByToken,
  updateUser,
  updateUserId
} from './userService';

export {
  getAllCollections,
  getCollectionByName,
  getCollectionById,
  updateCollection,
  createCollection,
  deleteCollection,
} from './collectionService';

export {
  getAllCategories,
  getCategoryByName,
  getCategoryById,
  updateCategory,
  createCategory,
  deleteCategory,
} from './categoryService';

export { getOrCreateGuestId, removeGuestId } from './guestService';