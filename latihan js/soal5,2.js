let product = {
    nama: 'Laptop',
    harga: 15000000,
    stok: 10,
    
    infoProduk: function() {
        return `Nama Produk: ${this.nama}, Harga: Rp${this.harga}, Stok: ${this.stok}`;
    }
}

console.log(product.infoProduk());