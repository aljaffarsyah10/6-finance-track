import { CategoryRepository } from "@/repositories/category.repository";
import { TransactionType } from "@prisma/client";

export class CategoryService {
  static async getCategories(userId: string, type?: TransactionType) {
    return CategoryRepository.findManyByUser(userId, type);
  }

  static async createCategory(
    userId: string,
    data: { name: string; type: TransactionType; icon?: string; color?: string }
  ) {
    return CategoryRepository.create({
      userId,
      name: data.name,
      type: data.type,
      icon: data.icon,
      color: data.color,
    });
  }

  static async updateCategory(
    id: string,
    userId: string,
    data: { name?: string; icon?: string; color?: string }
  ) {
    const existing = await CategoryRepository.findById(id, userId);
    if (!existing) {
      throw new Error("Kategori tidak ditemukan atau bukan milik Anda.");
    }

    return CategoryRepository.update(id, userId, data);
  }

  static async deleteCategory(id: string, userId: string) {
    const existing = await CategoryRepository.findById(id, userId);
    if (!existing) {
      throw new Error("Kategori tidak ditemukan atau bukan milik Anda.");
    }

    const { txCount, bgtCount } = await CategoryRepository.countUsage(id);
    if (txCount > 0 || bgtCount > 0) {
      throw new Error(
        `Kategori tidak dapat dihapus karena masih digunakan pada ${txCount} transaksi dan ${bgtCount} anggaran.`
      );
    }

    await CategoryRepository.delete(id);
    return { success: true };
  }
}
