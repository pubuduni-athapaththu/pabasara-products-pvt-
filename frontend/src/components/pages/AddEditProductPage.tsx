import { useState, useEffect } from 'react'
import { ArrowLeft, Upload } from 'lucide-react'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { Textarea } from '../ui/textarea'
import * as Select from '@radix-ui/react-select'
import * as Checkbox from '@radix-ui/react-checkbox'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import type { Product } from '../../types'
import React from 'react'

interface AddEditProductPageProps {
  product?: Product | null
  onSave: (productData: Omit<Product, 'id'>) => void
  onCancel: () => void
}

export function AddEditProductPage({ product, onSave, onCancel }: AddEditProductPageProps) {
  const [formData, setFormData] = useState<{
    name: string
    description: string
    price: string
    category: 'sesame' | 'peanut' | 'semolina' | ''
    stock: string
    image: string
    featured: boolean
  }>({
    name: '',
    description: '',
    price: '',
    category: '',
    stock: '',
    image: '',
    featured: false,
  })

  const [errors, setErrors] = useState<{ [key: string]: string }>({})

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        description: product.description,
        price: product.price.toString(),
        category: product.category,
        stock: product.stock.toString(),
        image: product.image,
        featured: product.featured || false,
      })
    }
  }, [product])

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: '' }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const newErrors: { [key: string]: string } = {}
    if (!formData.name.trim()) newErrors.name = 'Product name is required'
    if (!formData.description.trim()) newErrors.description = 'Description is required'
    if (!formData.price || parseFloat(formData.price) <= 0)
      newErrors.price = 'Valid price is required'
    if (!formData.category) newErrors.category = 'Category is required'
    if (!formData.stock || parseInt(formData.stock) < 0)
      newErrors.stock = 'Valid stock quantity is required'
    if (!formData.image.trim()) newErrors.image = 'Product image URL is required'
    setErrors(newErrors)

    if (Object.keys(newErrors).length === 0) {
      const productData: Omit<Product, 'id'> = {
        name: formData.name.trim(),
        description: formData.description.trim(),
        price: parseFloat(formData.price),
        category: formData.category as 'sesame' | 'peanut' | 'semolina',
        stock: parseInt(formData.stock),
        image: formData.image.trim(),
        featured: formData.featured,
      }
      onSave(productData)
    }
  }

  const suggestedImages = ['/placeholder-image.png']

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <Button variant="ghost" onClick={onCancel} className="mb-8">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Dashboard
        </Button>

        <h1 className="text-3xl mb-2">{product ? 'Edit Product' : 'Add New Product'}</h1>
        <p className="text-muted-foreground mb-8">
          {product
            ? 'Update the product information below'
            : 'Fill in the details to add a new product'}
        </p>

        <form onSubmit={handleSubmit}>
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Info */}
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Basic Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="name">Product Name</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className={errors.name ? 'border-destructive' : ''}
                    />
                    {errors.name && <p className="text-sm text-destructive mt-1">{errors.name}</p>}
                  </div>

                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => handleInputChange('description', e.target.value)}
                      rows={4}
                      className={errors.description ? 'border-destructive' : ''}
                    />
                    {errors.description && (
                      <p className="text-sm text-destructive mt-1">{errors.description}</p>
                    )}
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="category">Category</Label>
                      <Select.Root
                        value={formData.category}
                        onValueChange={(value: string) => handleInputChange('category', value)}
                      >
                        <Select.Trigger
                          className={`w-full ${errors.category ? 'border-destructive' : ''}`}
                        >
                          <Select.Value placeholder="Select category" />
                        </Select.Trigger>

                        {/* ✅ FIX: portal + popper + z-index */}
                        <Select.Portal>
                          <Select.Content
                            position="popper"
                            sideOffset={4}
                            className="z-50 rounded-md border bg-white shadow-md"
                          >
                            <Select.Viewport className="p-1">
                              <Select.Item value="sesame" className="px-3 py-2 cursor-pointer">
                                <Select.ItemText>Sesame</Select.ItemText>
                              </Select.Item>
                              <Select.Item value="peanut" className="px-3 py-2 cursor-pointer">
                                <Select.ItemText>Peanut</Select.ItemText>
                              </Select.Item>
                              <Select.Item value="semolina" className="px-3 py-2 cursor-pointer">
                                <Select.ItemText>Semolina</Select.ItemText>
                              </Select.Item>
                            </Select.Viewport>
                          </Select.Content>
                        </Select.Portal>
                      </Select.Root>
                      {errors.category && (
                        <p className="text-sm text-destructive mt-1">{errors.category}</p>
                      )}
                    </div>

                    <div className="flex items-center space-x-2 pt-6">
                      <Checkbox.Root
                        id="featured"
                        checked={formData.featured}
                        onCheckedChange={(checked: boolean | 'indeterminate') =>
                          handleInputChange('featured', checked === true)
                        }
                      >
                        <Checkbox.Indicator>✔</Checkbox.Indicator>
                      </Checkbox.Root>
                      <Label htmlFor="featured" className="cursor-pointer">
                        Featured Product
                      </Label>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Pricing & Inventory</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="price">Price (LKR)</Label>
                      <Input
                        id="price"
                        type="number"
                        step="0.01"
                        min="0"
                        value={formData.price}
                        onChange={(e) => handleInputChange('price', e.target.value)}
                        className={errors.price ? 'border-destructive' : ''}
                      />
                      {errors.price && (
                        <p className="text-sm text-destructive mt-1">{errors.price}</p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="stock">Stock Quantity</Label>
                      <Input
                        id="stock"
                        type="number"
                        min="0"
                        value={formData.stock}
                        onChange={(e) => handleInputChange('stock', e.target.value)}
                        className={errors.stock ? 'border-destructive' : ''}
                      />
                      {errors.stock && (
                        <p className="text-sm text-destructive mt-1">{errors.stock}</p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Product Image */}
            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle>Product Image</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="image">Image URL</Label>
                    <Input
                      id="image"
                      value={formData.image}
                      onChange={(e) => handleInputChange('image', e.target.value)}
                      placeholder="https://example.com/image.jpg"
                      className={errors.image ? 'border-destructive' : ''}
                    />
                    {errors.image && (
                      <p className="text-sm text-destructive mt-1">{errors.image}</p>
                    )}
                  </div>

                  {formData.image && (
                    <div className="aspect-square overflow-hidden rounded-lg border">
                      <img
                        src={formData.image}
                        alt="Product preview"
                        className="w-full h-full object-cover"
                        onError={(e) =>
                          ((e.target as HTMLImageElement).src = '/placeholder-image.png')
                        }
                      />
                    </div>
                  )}

                  <div>
                    <Label className="text-sm text-muted-foreground">Sample Images</Label>
                    <div className="grid grid-cols-2 gap-2 mt-2">
                      {suggestedImages.map((url, i) => (
                        <button
                          key={i}
                          type="button"
                          onClick={() => handleInputChange('image', url)}
                          className="aspect-square overflow-hidden rounded border hover:border-primary transition-colors"
                        >
                          <img
                            src={url}
                            alt={`Sample ${i + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  <Button variant="outline" className="w-full" type="button">
                    <Upload className="w-4 h-4 mr-2" /> Upload Image
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="flex justify-end space-x-4 mt-8">
            <Button variant="outline" type="button" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="submit">{product ? 'Update Product' : 'Add Product'}</Button>
          </div>
        </form>
      </div>
    </div>
  )
}
