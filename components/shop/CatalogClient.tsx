"use client";

import { useState, useMemo } from "react";
import { ProductCard } from "@/components/shop/ProductCard/ProductCard";
import { ShopHeader } from "@/components/shop/ShopHeader";
import { Footer } from "@/components/shop/Footer";
import { Search, ArrowUpDown, Sparkles, Flower2, RefreshCw, Gift, Check, Tag } from "lucide-react";
import { useCart } from "@/components/shop/Cart/CartContext";
import { useTranslations } from "next-intl";
import { WhatsAppButton } from "@/components/shop/WhatsAppButton";

interface CatalogClientProps {
  initialProducts: any[];
  initialAddons?: any[];
}

export function CatalogClient({ initialProducts, initialAddons = [] }: CatalogClientProps) {
  const t = useTranslations("Catalog");
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState<"all" | "products" | "addons">("all");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState<"featured" | "price-asc" | "price-desc">("featured");
  const { addToCart } = useCart();
  const [addedAddonId, setAddedAddonId] = useState<string | null>(null);

  // Normalizar items combinados (Colchones + Accesorios)
  const combinedItems = useMemo(() => {
    const productsFormatted = initialProducts.map((p) => ({
      ...p,
      itemType: "product",
      displayCategory: p.category || "Colchones",
    }));

    const addonsFormatted = initialAddons.map((a) => ({
      ...a,
      itemType: "addon",
      images: [a.image || "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&q=80&w=600"],
      displayCategory: a.category ? `Accesorio: ${a.category}` : "Accesorios",
    }));

    return [...productsFormatted, ...addonsFormatted];
  }, [initialProducts, initialAddons]);

  // Extraer categorías únicas
  const categories = useMemo(() => {
    const set = new Set<string>();
    combinedItems.forEach((item) => {
      if (item.displayCategory) set.add(item.displayCategory);
    });
    return Array.from(set);
  }, [combinedItems]);

  // Filtrado y Ordenamiento en tiempo real
  const filteredItems = useMemo(() => {
    return combinedItems
      .filter((item) => {
        // Filtro por Tab
        if (activeTab === "products" && item.itemType !== "product") return false;
        if (activeTab === "addons" && item.itemType !== "addon") return false;

        // Filtro por Búsqueda
        const matchSearch =
          searchTerm === "" ||
          item.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.displayCategory?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.mattressSize?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.firmness?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.structureType?.toLowerCase().includes(searchTerm.toLowerCase());

        // Filtro por Categoría
        const matchCategory =
          selectedCategory === "all" ||
          item.displayCategory?.toLowerCase() === selectedCategory.toLowerCase();

        return matchSearch && matchCategory;
      })
      .sort((a, b) => {
        if (sortBy === "price-asc") return a.price - b.price;
        if (sortBy === "price-desc") return b.price - a.price;
        return 0;
      });
  }, [combinedItems, activeTab, searchTerm, selectedCategory, sortBy]);

  const handleAddAddonToCart = (addon: any) => {
    addToCart({
      id: addon._id,
      name: addon.name,
      price: addon.price,
      image: addon.images[0],
    });
    setAddedAddonId(addon._id);
    setTimeout(() => setAddedAddonId(null), 2000);
  };

  return (
    <div className="min-h-screen bg-[#FAF2FF] dark:bg-[#0D0115] flex flex-col">
      <ShopHeader />

      <main className="flex-1 py-10 md:py-16">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl space-y-8">
          
          {/* Cabecera Principal del Catálogo */}
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-[#A507FA] text-xs font-extrabold uppercase tracking-[0.25em] bg-purple-50 dark:bg-purple-950/60 px-4 py-1.5 rounded-full border border-purple-200 dark:border-purple-800 inline-block">
              {t('headerBadge')}
            </span>
            <h1 className="text-4xl md:text-5xl font-serif font-black text-[#12021E] dark:text-white tracking-tight">
              {t('headerTitle')}
            </h1>
            <p className="text-gray-600 dark:text-gray-300 text-sm md:text-base font-medium leading-relaxed">
              {t('headerDesc')}
            </p>
          </div>

          {/* TAB SWITCHER: Todos | Arreglos | Adicionales */}
          <div className="flex justify-center gap-2 max-w-md mx-auto p-1.5 bg-purple-100/70 dark:bg-purple-950/50 rounded-full">
            <button
              onClick={() => { setActiveTab("all"); setSelectedCategory("all"); }}
              className={`flex-1 py-2.5 px-4 rounded-full text-xs font-extrabold transition-all text-center ${
                activeTab === "all"
                  ? "bg-[#A507FA] text-white shadow-md"
                  : "text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white"
              }`}
            >
              {t('allTab')} ({combinedItems.length})
            </button>
            <button
              onClick={() => { setActiveTab("products"); setSelectedCategory("all"); }}
              className={`flex-1 py-2.5 px-4 rounded-full text-xs font-extrabold transition-all text-center ${
                activeTab === "products"
                  ? "bg-[#A507FA] text-white shadow-md"
                  : "text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white"
              }`}
            >
              {t('flowersTab')} ({initialProducts.length})
            </button>
            <button
              onClick={() => { setActiveTab("addons"); setSelectedCategory("all"); }}
              className={`flex-1 py-2.5 px-4 rounded-full text-xs font-extrabold transition-all text-center ${
                activeTab === "addons"
                  ? "bg-[#A507FA] text-white shadow-md"
                  : "text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white"
              }`}
            >
              {t('addonsTab')} ({initialAddons.length})
            </button>
          </div>

          {/* PANEL DE BÚSQUEDA Y FILTROS */}
          <div className="bg-white dark:bg-[#12021E] p-5 md:p-6 rounded-3xl border border-purple-100 dark:border-purple-950/80 shadow-sm space-y-5">
            <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
              
              {/* Campo de Búsqueda Sencillo */}
              <div className="relative w-full md:w-96">
                <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder={t('searchPlaceholder')}
                  className="w-full pl-11 pr-4 py-3 border border-purple-100 dark:border-purple-900/60 rounded-2xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#A507FA] transition-all bg-purple-50/30 dark:bg-purple-950/30 dark:text-white"
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-gray-400 hover:text-gray-600 bg-gray-200 rounded-full w-5 h-5 flex items-center justify-center"
                  >
                    ✕
                  </button>
                )}
              </div>

              {/* Ordenamiento por Precio */}
              <div className="flex items-center gap-3 w-full md:w-auto justify-end">
                <span className="text-xs font-bold text-gray-500 dark:text-gray-300 flex items-center gap-1.5">
                  <ArrowUpDown size={14} className="text-[#A507FA]" /> {t('sortBy')}
                </span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="p-3 border border-purple-100 dark:border-purple-900/60 rounded-2xl bg-white dark:bg-[#1A032A] text-xs font-bold text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-[#A507FA]"
                >
                  <option value="featured">{t('featured')}</option>
                  <option value="price-asc">{t('priceLowHigh')}</option>
                  <option value="price-desc">{t('priceHighLow')}</option>
                </select>
              </div>
            </div>

            {/* Pastillas de Categorías (Pills) */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-2 border-t border-purple-100 dark:border-purple-900/50 scrollbar-none">
              <button
                onClick={() => setSelectedCategory("all")}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap ${
                  selectedCategory === "all"
                    ? "bg-[#A507FA] text-white shadow-md"
                    : "bg-purple-50 dark:bg-purple-950/60 text-slate-700 dark:text-gray-300 hover:bg-purple-100"
                }`}
              >
                {t('allCategories')}
              </button>

              {categories.map((cat) => {
                const count = combinedItems.filter((i) => i.displayCategory === cat).length;
                const isSelected = selectedCategory === cat;

                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-4 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap ${
                      isSelected
                        ? "bg-[#A507FA] text-white shadow-md"
                        : "bg-purple-50 dark:bg-purple-950/60 text-slate-700 dark:text-gray-300 hover:bg-purple-100"
                    }`}
                  >
                    {cat} ({count})
                  </button>
                );
              })}
            </div>
          </div>

          {/* RESULTADOS DEL CATÁLOGO */}
          <div>
            <div className="flex justify-between items-center mb-6">
              <span className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                {t('showingItems')} <strong className="text-[#12021E] dark:text-white">{filteredItems.length}</strong> {t('itemsInCatalog')}
              </span>
              {(searchTerm || selectedCategory !== "all" || activeTab !== "all") && (
                <button
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedCategory("all");
                    setActiveTab("all");
                  }}
                  className="text-xs font-bold text-[#A507FA] hover:underline flex items-center gap-1"
                >
                  <RefreshCw size={12} /> {t('clearFilters')}
                </button>
              )}
            </div>

            {filteredItems.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredItems.map((item) => {
                  if (item.itemType === "product") {
                    return (
                      <ProductCard
                        key={item._id}
                        id={item._id}
                        name={item.name}
                        slug={item.slug}
                        price={item.price}
                        category={item.category}
                        badge={item.badge}
                        image={item.images[0] || "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&q=80&w=800"}
                      />
                    );
                  }

                  // TARJETA DE ADICIONAL
                  const isAdded = addedAddonId === item._id;

                  return (
                    <div
                      key={item._id}
                      className="bg-white dark:bg-[#12021E] rounded-3xl p-5 border border-purple-100 dark:border-purple-900/60 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group relative overflow-hidden"
                    >
                      <div className="space-y-3">
                        <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-purple-50 dark:bg-purple-950/40">
                          <img
                            src={item.images[0]}
                            alt={item.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          <span className="absolute top-3 left-3 bg-[#A507FA] text-white text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-1 shadow-md">
                            <Sparkles size={11} /> {t('addonBadge')}
                          </span>
                        </div>

                        <div>
                          <span className="text-[11px] font-bold text-[#A507FA] uppercase tracking-wider block">
                            {item.category || t('addonBadge')}
                          </span>
                          <h3 className="font-bold text-lg text-[#12021E] dark:text-white line-clamp-1 group-hover:text-[#A507FA] transition-colors">
                            {item.name}
                          </h3>
                          {item.description && (
                            <p className="text-xs text-gray-400 line-clamp-2 mt-1 font-medium">
                              {item.description}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="pt-4 mt-3 border-t border-purple-100 dark:border-purple-900/40 flex items-center justify-between">
                        <div>
                          <span className="text-[10px] text-gray-400 font-bold block uppercase">Precio</span>
                          <span className="text-xl font-black text-[#A507FA] dark:text-[#D48FFF]">
                            ${item.price.toFixed(2)} <span className="text-xs font-bold text-gray-500">USD</span>
                          </span>
                        </div>

                        <button
                          onClick={() => handleAddAddonToCart(item)}
                          className={`px-4 py-2.5 rounded-full font-bold text-xs transition-all flex items-center gap-1.5 shadow-sm ${
                            isAdded
                              ? "bg-green-600 text-white"
                              : "bg-[#A507FA] hover:bg-[#8B00D9] text-white"
                          }`}
                        >
                          {isAdded ? (
                            <>
                              <Check size={14} /> {t('added')}
                            </>
                          ) : (
                            <>
                              <Gift size={14} /> {t('addToCart')}
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="bg-white dark:bg-[#12021E] p-12 rounded-3xl border border-purple-100 dark:border-purple-900/60 text-center space-y-4 max-w-lg mx-auto shadow-sm">
                <Sparkles size={48} className="mx-auto text-purple-300" />
                <h3 className="text-xl font-bold text-[#12021E] dark:text-white">{t('noResultsTitle')}</h3>
                <p className="text-xs text-gray-400">
                  {t('noResultsDesc')}
                </p>
                <button
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedCategory("all");
                    setActiveTab("all");
                  }}
                  className="bg-[#A507FA] text-white px-6 py-2.5 rounded-full font-bold text-xs hover:bg-[#8B00D9] transition-colors"
                >
                  {t('viewAllBtn')}
                </button>
              </div>
            )}
          </div>

        </div>
      </main>

      <WhatsAppButton phoneNumber="584141584360" />
      <Footer />
    </div>
  );
}
