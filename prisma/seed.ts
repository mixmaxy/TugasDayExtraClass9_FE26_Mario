// Seed database dengan data contoh untuk development
// Jalankan dengan: npm run db:seed
 
import { PrismaClient } from "@prisma/client";
 
const prisma = new PrismaClient();
 
const SAMPLE_FOODS = [
  {
    name: "Salad Quinoa Mediterania",
    ingredients: "quinoa, tomat ceri, timun, zaitun hitam, keju feta, daun mint, lemon, minyak zaitun",
    description:
      "Salad segar kaya protein dari quinoa yang dipadukan dengan sayuran mediterania, keju feta asin, dan dressing lemon-zaitun yang ringan. Sempurna sebagai makan siang yang mengenyangkan.",
    type: "fresh" as const,
    imageUrl: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&auto=format&fit=crop",
  },
  {
    name: "Indomie Goreng",
    ingredients: "mie, minyak sawit, bumbu (garam, gula, bawang putih, MSG), kecap, saus cabai",
    description:
      "Mi instan goreng paling populer di Indonesia. Mengandung pengawet, MSG, dan bahan penguat rasa. Masuk kategori Ultra-Processed Food (UPF) karena proses produksinya yang industrial.",
    type: "upf" as const,
    imageUrl: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=800&auto=format&fit=crop",
  },
  {
    name: "Smoothie Bowl Mangga Acai",
    ingredients: "acai, mangga beku, pisang, susu almond, granola, buah naga, chia seed, madu",
    description:
      "Bowl nutrisi padat dengan base acai dan mangga yang diblender kental, ditoppin dengan granola renyah, buah naga segar, dan taburan chia seed. Kaya antioksidan dan serat.",
    type: "fresh" as const,
    imageUrl: "https://images.unsplash.com/photo-1590301157890-4810ed352733?w=800&auto=format&fit=crop",
  },
  {
    name: "Oreo Original",
    ingredients: "tepung terigu, gula, minyak sawit, kakao, pengembang (natrium bikarbonat), lesitin kedelai, vanila artifisial",
    description:
      "Biskuit sandwich ikonik dengan krim vanilla di tengahnya. UPF klasik dengan tinggi gula dan lemak trans, menggunakan berbagai bahan aditif untuk memperpanjang shelf life.",
    type: "upf" as const,
    imageUrl: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=800&auto=format&fit=crop",
  },
  {
    name: "Nasi Merah Pecel",
    ingredients: "nasi merah, bayam rebus, kecambah, tahu goreng, tempe, kacang panjang, bumbu pecel (kacang, cabai, kencur, daun jeruk)",
    description:
      "Makanan tradisional Jawa dengan nasi merah bergizi tinggi, berbagai sayuran kukus, dan saus kacang pecel yang kaya rempah. Sumber serat, protein nabati, dan karbohidrat kompleks.",
    type: "fresh" as const,
    imageUrl: "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=800&auto=format&fit=crop",
  },
  {
    name: "Sosis So Good Ayam",
    ingredients: "daging ayam mekanis, tepung tapioka, minyak nabati, garam, gula, sodium tripolifosfat, natrium eritorbat, natrium nitrit",
    description:
      "Sosis ayam olahan yang populer untuk sarapan. Mengandung daging ayam mekanis, berbagai sodium, pengawet nitrit, dan pengikat fosfat — ciri khas produk daging ultra-proses.",
    type: "upf" as const,
    imageUrl: "https://images.unsplash.com/photo-1608039755401-742074f0548d?w=800&auto=format&fit=crop",
  },
];
 
async function main() {
  console.log("🌱 Mulai seeding database...");
 
  // Hapus data lama terlebih dahulu (untuk idempotency)
  await prisma.food.deleteMany();
  console.log("🗑️  Data lama dihapus");
 
  // Insert data baru
  const created = await prisma.food.createMany({
    data: SAMPLE_FOODS,
  });
 
  console.log(`✅ ${created.count} makanan berhasil ditambahkan!`);
  console.log("🎉 Seeding selesai!");
}
 
main()
  .catch((e) => {
    console.error("❌ Error saat seeding:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });