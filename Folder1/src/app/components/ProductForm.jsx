import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { ArrowLeft } from 'lucide-react';
import { getProductById, addProduct, updateProduct } from '../data/mockData';
import { toast } from 'sonner';

export function ProductForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = !!id;

  const [formData, setFormData] = useState({
    name: '',
    category: '',
    price: '',
    unit: '',
    stock: '',
    lowStockThreshold: '',
    description: '',
    imageUrl: ''
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isEditing && id) {
      const product = getProductById(id);
      if (product) {
        setFormData({
          name: product.name,
          category: product.category,
          price: product.price.toString(),
          unit: product.unit,
          stock: product.stock.toString(),
          lowStockThreshold: product.lowStockThreshold.toString(),
          description: product.description,
          imageUrl: product.imageUrl
        });
      } else {
        toast.error('Product not found');
        navigate('/products');
      }
    }
  }, [id, isEditing, navigate]);

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.category) newErrors.category = 'Category is required';
    if (!formData.price || parseFloat(formData.price) <= 0) {
      newErrors.price = 'Price must be greater than 0';
    }
    if (!formData.unit.trim()) newErrors.unit = 'Unit is required';
    if (!formData.stock || parseInt(formData.stock) < 0) {
      newErrors.stock = 'Stock must be 0 or greater';
    }
    if (!formData.lowStockThreshold || parseInt(formData.lowStockThreshold) < 0) {
      newErrors.lowStockThreshold = 'Threshold must be 0 or greater';
    }
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (!formData.imageUrl.trim()) newErrors.imageUrl = 'Image URL is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) {
      toast.error('Please fix the errors in the form');
      return;
    }

    const productData = {
      name: formData.name.trim(),
      category: formData.category,
      price: parseFloat(formData.price),
      unit: formData.unit.trim(),
      stock: parseInt(formData.stock),
      lowStockThreshold: parseInt(formData.lowStockThreshold),
      description: formData.description.trim(),
      imageUrl: formData.imageUrl.trim()
    };

    if (isEditing && id) {
      const updated = updateProduct(id, productData);
      if (updated) {
        toast.success('Product updated successfully');
        navigate('/products');
      } else {
        toast.error('Failed to update product');
      }
    } else {
      addProduct(productData);
      toast.success('Product added successfully');
      navigate('/products');
    }
  };

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  const categories = [
    'Vegetables',
    'Fruits',
    'Dairy & Eggs',
    'Grains',
    'Herbs',
    'Other'];


  const units = ['lb', 'kg', 'dozen', 'pint', 'quart', 'gallon', 'bunch', 'head', 'jar', 'bottle'];

  return (
    <div className="space-y-6 max-w-3xl">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate('/products')}>

          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            {isEditing ? 'Edit Product' : 'Add New Product'}
          </h1>
          <p className="text-gray-600 mt-1">
            {isEditing ? 'Update product information' : 'Enter details for your new product'}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle>Product Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Product Name */}
            <div className="space-y-2">
              <Label htmlFor="name">Product Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                placeholder="e.g., Organic Tomatoes"
                className={errors.name ? 'border-red-500' : ''} />

              {errors.name && <p className="text-sm text-red-600">{errors.name}</p>}
            </div>

            {/* Category and Unit */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="category">Category *</Label>
                <Select value={formData.category} onValueChange={(val) => handleChange('category', val)}>
                  <SelectTrigger className={errors.category ? 'border-red-500' : ''}>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) =>
                      <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                    )}
                  </SelectContent>
                </Select>
                {errors.category && <p className="text-sm text-red-600">{errors.category}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="unit">Unit *</Label>
                <Select value={formData.unit} onValueChange={(val) => handleChange('unit', val)}>
                  <SelectTrigger className={errors.unit ? 'border-red-500' : ''}>
                    <SelectValue placeholder="Select unit" />
                  </SelectTrigger>
                  <SelectContent>
                    {units.map((unit) =>
                      <SelectItem key={unit} value={unit}>{unit}</SelectItem>
                    )}
                  </SelectContent>
                </Select>
                {errors.unit && <p className="text-sm text-red-600">{errors.unit}</p>}
              </div>
            </div>

            {/* Price */}
            <div className="space-y-2">
              <Label htmlFor="price">Price per Unit *</Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">₹</span>
                <Input
                  id="price"
                  type="number"
                  step="0.01"
                  value={formData.price}
                  onChange={(e) => handleChange('price', e.target.value)}
                  placeholder="0.00"
                  className={`pl-8 ${errors.price ? 'border-red-500' : ''}`} />

              </div>
              {errors.price && <p className="text-sm text-red-600">{errors.price}</p>}
            </div>

            {/* Stock and Threshold */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="stock">Current Stock *</Label>
                <Input
                  id="stock"
                  type="number"
                  value={formData.stock}
                  onChange={(e) => handleChange('stock', e.target.value)}
                  placeholder="0"
                  className={errors.stock ? 'border-red-500' : ''} />

                {errors.stock && <p className="text-sm text-red-600">{errors.stock}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="lowStockThreshold">Low Stock Threshold *</Label>
                <Input
                  id="lowStockThreshold"
                  type="number"
                  value={formData.lowStockThreshold}
                  onChange={(e) => handleChange('lowStockThreshold', e.target.value)}
                  placeholder="0"
                  className={errors.lowStockThreshold ? 'border-red-500' : ''} />

                {errors.lowStockThreshold &&
                  <p className="text-sm text-red-600">{errors.lowStockThreshold}</p>
                }
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleChange('description', e.target.value)}
                placeholder="Describe your product..."
                rows={4}
                className={errors.description ? 'border-red-500' : ''} />

              {errors.description && <p className="text-sm text-red-600">{errors.description}</p>}
            </div>

            {/* Image URL */}
            <div className="space-y-2">
              <Label htmlFor="imageUrl">Image URL *</Label>
              <Input
                id="imageUrl"
                type="url"
                value={formData.imageUrl}
                onChange={(e) => handleChange('imageUrl', e.target.value)}
                placeholder="https://example.com/image.jpg"
                className={errors.imageUrl ? 'border-red-500' : ''} />

              {errors.imageUrl && <p className="text-sm text-red-600">{errors.imageUrl}</p>}
              {formData.imageUrl && !errors.imageUrl &&
                <div className="mt-4">
                  <p className="text-sm text-gray-600 mb-2">Preview:</p>
                  <div className="w-full h-48 rounded-lg overflow-hidden bg-gray-100">
                    <img
                      src={formData.imageUrl}
                      alt="Preview"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }} />

                  </div>
                </div>
              }
            </div>

            {/* Actions */}
            <div className="flex gap-4 pt-4">
              <Button
                type="submit"
                className="bg-emerald-600 hover:bg-emerald-700">

                {isEditing ? 'Update Product' : 'Add Product'}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate('/products')}>

                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      </form>
    </div>);

}