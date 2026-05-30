import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaShoppingCart, FaTrash, FaCheck, FaTimes, FaPlus, FaMinus } from 'react-icons/fa';

const PRODUCTS = [
  {
    id: 1,
    name: 'DJ Hamida Signature Hoodie',
    price: 65.00,
    category: 'Hoodies',
    cover: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=600&q=80',
    description: 'Ultra-heavyweight 450gsm organic cotton hoodie. Features metallic gold DJ Hamida chest logo and "A La Bien" back-embroidery. Oversized fit.',
    sizes: ['S', 'M', 'L', 'XL']
  },
  {
    id: 2,
    name: '"A La Bien" Premium Cap',
    price: 28.00,
    category: 'Caps',
    cover: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=600&q=80',
    description: 'Structured 6-panel snapback cap in matte black. Electric purple high-definition embroidery, adjustable rear strap.',
    sizes: ['One Size']
  },
  {
    id: 3,
    name: 'DJ Hamida Tour Club Tee',
    price: 35.00,
    category: 'T-Shirts',
    cover: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=600&q=80',
    description: '100% combed ringspun cotton tee in black. Graphic print commemorating the 2026 Summer Tour stops. Pre-shrunk.',
    sizes: ['S', 'M', 'L', 'XL']
  },
  {
    id: 4,
    name: 'Summer Session Tour Poster',
    price: 20.00,
    category: 'Posters',
    cover: 'https://images.unsplash.com/photo-1583795128727-6ec3a42405f9?w=600&q=80',
    description: 'High-quality screenprinted lithography poster on 300gsm metallic satin paper. Measures 24" x 36". Individually hand-signed.',
    sizes: ['Standard']
  }
];

export default function Shop() {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedSizes, setSelectedSizes] = useState({ 1: 'M', 2: 'One Size', 3: 'L', 4: 'Standard' });
  const [checkoutStep, setCheckoutStep] = useState('idle'); // idle, processing, success

  const handleSizeChange = (productId, size) => {
    setSelectedSizes(prev => ({ ...prev, [productId]: size }));
  };

  const addToCart = (product) => {
    const selectedSize = selectedSizes[product.id];
    const cartItemId = `${product.id}-${selectedSize}`;
    
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.cartItemId === cartItemId);
      if (existingItem) {
        return prevCart.map(item => 
          item.cartItemId === cartItemId 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        );
      } else {
        return [...prevCart, { ...product, selectedSize, cartItemId, quantity: 1 }];
      }
    });
    
    setIsCartOpen(true);
  };

  const removeFromCart = (cartItemId) => {
    setCart(prevCart => prevCart.filter(item => item.cartItemId !== cartItemId));
  };

  const updateQuantity = (cartItemId, amount) => {
    setCart(prevCart => prevCart.map(item => {
      if (item.cartItemId === cartItemId) {
        const nextQty = item.quantity + amount;
        return nextQty > 0 ? { ...item, quantity: nextQty } : item;
      }
      return item;
    }));
  };

  const handleCheckout = () => {
    setCheckoutStep('processing');
    setTimeout(() => {
      setCheckoutStep('success');
      setCart([]);
    }, 2000);
  };

  const totalCartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  return (
    <div className="pt-24 pb-20 px-6 font-montserrat select-none max-w-7xl mx-auto">
      
      {/* Page Header */}
      <div className="text-center mb-16 relative">
        <span className="text-xs font-bold text-brand-gold tracking-[0.25em] uppercase">OFFICIAL STORE</span>
        <h1 className="text-5xl md:text-7xl text-white font-bold tracking-widest mt-2 uppercase">
          Merchandise
        </h1>
        <div className="w-24 h-1 bg-brand-purple mx-auto mt-4 rounded-full" />
        
        {/* Floating Cart Trigger Button */}
        <button 
          onClick={() => setIsCartOpen(true)}
          className="absolute right-0 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/5 border border-white/10 hover:border-brand-blue hover:text-brand-blue flex items-center gap-2 cursor-pointer transition-colors"
          title="Open Shopping Cart"
        >
          <FaShoppingCart />
          {totalCartCount > 0 && (
            <span className="text-[10px] font-bold bg-brand-purple text-white px-2 py-0.5 rounded-full shadow-neon-purple animate-pulse">
              {totalCartCount}
            </span>
          )}
        </button>
      </div>

      {/* Products Catalog Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {PRODUCTS.map((prod) => (
          <div 
            key={prod.id} 
            className="glass-card rounded-2xl p-5 border border-white/5 hover:border-brand-purple/35 transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              {/* Product Cover image */}
              <div className="rounded-xl overflow-hidden aspect-[4/5] bg-neutral-900 mb-4 relative group">
                <img 
                  src={prod.cover} 
                  alt={prod.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 text-[9px] bg-brand-gold text-black font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                  {prod.category}
                </span>
              </div>
              
              <h3 className="text-lg font-bold text-white font-poppins mb-1 leading-snug">
                {prod.name}
              </h3>
              
              <p className="text-[11px] text-white/50 mb-3 leading-relaxed">
                {prod.description}
              </p>

              {/* Size Selectors (if more than 1 size) */}
              {prod.sizes.length > 1 && (
                <div className="flex gap-2 items-center mb-4">
                  <span className="text-[9px] text-white/40 uppercase font-semibold">Size:</span>
                  <div className="flex gap-1.5">
                    {prod.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => handleSizeChange(prod.id, size)}
                        className={`w-6 h-6 rounded flex items-center justify-center text-[9px] font-bold border transition-colors cursor-pointer ${
                          selectedSizes[prod.id] === size 
                            ? 'border-brand-blue bg-brand-blue/10 text-brand-blue font-black' 
                            : 'border-white/10 text-white/60 hover:text-white hover:border-white/30'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Add to Cart Control Row */}
            <div className="flex justify-between items-center mt-4 pt-4 border-t border-white/5">
              <span className="text-xl font-bebas text-brand-gold tracking-wider">
                ${prod.price.toFixed(2)}
              </span>
              <button
                onClick={() => addToCart(prod)}
                className="px-4 py-2 rounded-full bg-brand-purple hover:bg-brand-purple/80 hover:shadow-neon-purple text-white text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5 cursor-pointer transition-all"
              >
                <FaShoppingCart className="text-[9px]" />
                <span>Add to Cart</span>
              </button>
            </div>

          </div>
        ))}
      </div>

      {/* Cart Sidebar Modal Drawer */}
      <AnimatePresence>
        {isCartOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex justify-end"
          >
            {/* Click backdrop to close */}
            <div className="absolute inset-0 z-0" onClick={() => setIsCartOpen(false)} />

            {/* Sidebar content */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="w-full max-w-md bg-brand-black border-l border-white/10 p-6 flex flex-col justify-between relative z-10 shadow-2xl h-full"
            >
              <div>
                {/* Header */}
                <div className="flex justify-between items-center mb-6 pb-4 border-b border-white/5">
                  <h3 className="text-xl font-bold text-white flex items-center gap-2">
                    <FaShoppingCart className="text-brand-blue" />
                    <span>Shopping Cart</span>
                  </h3>
                  <button 
                    onClick={() => setIsCartOpen(false)}
                    className="text-white/60 hover:text-white text-lg p-1.5 cursor-pointer"
                  >
                    <FaTimes />
                  </button>
                </div>

                {/* Items Playlist */}
                <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-1">
                  {cart.length === 0 ? (
                    <p className="text-center text-xs text-white/40 py-10 uppercase tracking-widest">
                      Your cart is empty.
                    </p>
                  ) : (
                    cart.map((item) => (
                      <div 
                        key={item.cartItemId} 
                        className="glass-card rounded-xl p-3 border border-white/5 flex gap-4 items-center justify-between"
                      >
                        <img src={item.cover} alt={item.name} className="w-12 h-15 rounded object-cover flex-shrink-0" />
                        
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-xs text-white truncate font-poppins">{item.name}</h4>
                          <span className="text-[9px] bg-white/5 text-white/50 px-2 py-0.5 rounded font-bold uppercase tracking-wider mt-1 inline-block">
                            Size: {item.selectedSize}
                          </span>
                          
                          {/* Quantity selector */}
                          <div className="flex items-center gap-2 mt-2">
                            <button 
                              onClick={() => updateQuantity(item.cartItemId, -1)}
                              className="w-5 h-5 rounded bg-white/5 hover:bg-white/10 flex items-center justify-center text-[8px] cursor-pointer"
                            >
                              <FaMinus />
                            </button>
                            <span className="text-xs font-mono text-white px-1.5">{item.quantity}</span>
                            <button 
                              onClick={() => updateQuantity(item.cartItemId, 1)}
                              className="w-5 h-5 rounded bg-white/5 hover:bg-white/10 flex items-center justify-center text-[8px] cursor-pointer"
                            >
                              <FaPlus />
                            </button>
                          </div>
                        </div>

                        {/* Price and delete button */}
                        <div className="text-right flex flex-col justify-between items-end h-full">
                          <button 
                            onClick={() => removeFromCart(item.cartItemId)}
                            className="text-white/40 hover:text-red-400 text-xs p-1 transition-colors cursor-pointer"
                            title="Remove item"
                          >
                            <FaTrash />
                          </button>
                          <span className="text-xs font-bold text-brand-gold mt-4 font-mono">
                            ${(item.price * item.quantity).toFixed(2)}
                          </span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Checkout details */}
              {cart.length > 0 && (
                <div className="border-t border-white/5 pt-4">
                  <div className="flex justify-between items-center text-xs text-white/60 mb-2 uppercase">
                    <span>Shipping</span>
                    <span className="text-brand-blue font-bold">Free</span>
                  </div>
                  <div className="flex justify-between items-center text-sm font-bold text-white mb-6 uppercase">
                    <span>Subtotal</span>
                    <span className="text-brand-gold font-mono text-lg">${subtotal.toFixed(2)}</span>
                  </div>

                  <button
                    onClick={handleCheckout}
                    className="w-full py-3.5 rounded-full bg-gradient-to-r from-brand-blue to-brand-purple text-white text-xs font-bold uppercase tracking-widest shadow-neon-purple hover:scale-105 transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Secure Checkout</span>
                  </button>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Fullscreen Checkout Simulation overlays */}
      <AnimatePresence>
        {checkoutStep !== 'idle' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[99] bg-black/90 backdrop-blur-md flex items-center justify-center p-6"
          >
            <div className="glass-card rounded-3xl p-8 max-w-md w-full border border-white/10 text-center font-montserrat shadow-[0_20px_50px_rgba(0,0,0,0.6)]">
              {checkoutStep === 'processing' ? (
                <div>
                  {/* Rotating spinner */}
                  <div className="w-16 h-16 rounded-full border-4 border-white/5 border-t-brand-blue mx-auto mb-6 animate-spin" />
                  <h3 className="text-xl font-bold text-white mb-2 uppercase tracking-wide">Processing Payment</h3>
                  <p className="text-xs text-white/50">Simulating secure stripe checkout process...</p>
                </div>
              ) : (
                <div>
                  {/* Check animation */}
                  <motion.div 
                    initial={{ scale: 0.8 }}
                    animate={{ scale: [1, 1.15, 1] }}
                    className="w-16 h-16 rounded-full bg-brand-blue/10 border border-brand-blue/30 text-brand-blue flex items-center justify-center text-2xl mx-auto mb-6 shadow-neon-blue"
                  >
                    <FaCheck />
                  </motion.div>
                  <h3 className="text-2xl font-bold text-white mb-2 uppercase tracking-wider">Order Placed!</h3>
                  <p className="text-xs text-white/50 leading-relaxed mb-6">
                    Thank you! Your simulated transaction has been processed. A receipt has been sent to your inbox.
                  </p>
                  <button
                    onClick={() => setCheckoutStep('idle')}
                    className="px-8 py-2.5 rounded-full bg-white/5 border border-white/10 text-white hover:text-black hover:bg-brand-gold hover:border-brand-gold hover:shadow-neon-gold text-xs font-bold uppercase tracking-widest transition-all cursor-pointer"
                  >
                    Back to Store
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
