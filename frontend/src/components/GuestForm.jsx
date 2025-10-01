import React, { useState, useEffect } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { useToast } from '../hooks/use-toast';
import { mockAPI } from '../mock';
import { Users, CheckCircle, XCircle, MessageSquare } from 'lucide-react';

const GuestForm = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [guests, setGuests] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    attendance: '',
    guestCount: '',
    message: ''
  });
  const { toast } = useToast();

  useEffect(() => {
    setIsVisible(true);
    loadGuests();
  }, []);

  const loadGuests = async () => {
    try {
      const guestList = await mockAPI.getGuests();
      setGuests(guestList);
    } catch (error) {
      console.error('Error loading guests:', error);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.attendance) {
      toast({
        title: "Error",
        description: "Mohon lengkapi nama dan status kehadiran",
        variant: "destructive"
      });
      return;
    }

    if (formData.attendance === 'hadir' && (!formData.guestCount || formData.guestCount < 1)) {
      toast({
        title: "Error",
        description: "Mohon tentukan jumlah tamu yang akan hadir",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      const guestData = {
        ...formData,
        guestCount: formData.attendance === 'hadir' ? parseInt(formData.guestCount) : 0
      };
      
      await mockAPI.submitGuest(guestData);
      
      toast({
        title: "Berhasil!",
        description: "Terima kasih atas konfirmasi kehadiran Anda"
      });
      
      // Reset form
      setFormData({
        name: '',
        attendance: '',
        guestCount: '',
        message: ''
      });
      
      // Reload guests list
      loadGuests();
      
    } catch (error) {
      toast({
        title: "Error",
        description: "Terjadi kesalahan. Silakan coba lagi",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const attendingGuests = guests.filter(guest => guest.attendance === 'hadir');
  const totalAttendees = attendingGuests.reduce((sum, guest) => sum + guest.guestCount, 0);

  return (
    <div className={`space-y-8 transition-all duration-1000 ${
      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
    }`}>
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-3">
          <Users className="w-8 h-8 text-navy-600" />
          <h2 className="text-3xl md:text-4xl font-serif text-navy-800">
            Konfirmasi Kehadiran
          </h2>
          <Users className="w-8 h-8 text-navy-600" />
        </div>
        <div className="w-24 h-1 bg-navy-400 mx-auto"></div>
        <p className="text-navy-600 max-w-2xl mx-auto">
          Kehadiran dan doa restu Anda merupakan kebahagian bagi kami
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {/* RSVP Form */}
        <div className="lg:col-span-2">
          <Card className="bg-white/80 backdrop-blur-sm border-navy-200">
            <div className="p-6 md:p-8">
              <h3 className="text-2xl font-serif text-navy-800 mb-6 text-center">
                Form Konfirmasi
              </h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name */}
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-navy-700 font-medium">
                    Nama Lengkap *
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Masukkan nama lengkap Anda"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="border-navy-200 focus:border-navy-500 focus:ring-navy-500"
                    required
                  />
                </div>

                {/* Attendance */}
                <div className="space-y-2">
                  <Label className="text-navy-700 font-medium">
                    Status Kehadiran *
                  </Label>
                  <Select 
                    value={formData.attendance} 
                    onValueChange={(value) => handleInputChange('attendance', value)}
                  >
                    <SelectTrigger className="border-navy-200 focus:border-navy-500 focus:ring-navy-500">
                      <SelectValue placeholder="Pilih status kehadiran" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="hadir">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                          Hadir
                        </div>
                      </SelectItem>
                      <SelectItem value="tidak-hadir">
                        <div className="flex items-center gap-2">
                          <XCircle className="w-4 h-4 text-red-600" />
                          Tidak Hadir
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Guest Count - only show if attending */}
                {formData.attendance === 'hadir' && (
                  <div className="space-y-2 animate-slideDown">
                    <Label htmlFor="guestCount" className="text-navy-700 font-medium">
                      Jumlah Tamu *
                    </Label>
                    <Select 
                      value={formData.guestCount} 
                      onValueChange={(value) => handleInputChange('guestCount', value)}
                    >
                      <SelectTrigger className="border-navy-200 focus:border-navy-500 focus:ring-navy-500">
                        <SelectValue placeholder="Pilih jumlah tamu" />
                      </SelectTrigger>
                      <SelectContent>
                        {[1, 2, 3, 4, 5].map(num => (
                          <SelectItem key={num} value={num.toString()}>
                            {num} {num === 1 ? 'Orang' : 'Orang'}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}

                {/* Message */}
                <div className="space-y-2">
                  <Label htmlFor="message" className="text-navy-700 font-medium">
                    Ucapan & Doa (Opsional)
                  </Label>
                  <Textarea
                    id="message"
                    placeholder="Sampaikan ucapan dan doa terbaik untuk kami..."
                    value={formData.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    className="border-navy-200 focus:border-navy-500 focus:ring-navy-500 min-h-[100px]"
                    rows={4}
                  />
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-navy-600 hover:bg-navy-700 text-white py-3 text-lg font-medium transition-all duration-300 transform hover:scale-105"
                >
                  {isSubmitting ? (
                    <div className="flex items-center gap-2">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      Mengirim...
                    </div>
                  ) : (
                    'Konfirmasi Kehadiran'
                  )}
                </Button>
              </form>
            </div>
          </Card>
        </div>

        {/* Guest Stats & List */}
        <div className="space-y-6">
          {/* Statistics */}
          <Card className="bg-gradient-to-br from-navy-800 to-navy-900 text-white border-navy-700">
            <div className="p-6 text-center space-y-4">
              <Users className="w-12 h-12 text-navy-300 mx-auto" />
              <div>
                <h3 className="text-2xl font-bold">{totalAttendees}</h3>
                <p className="text-navy-300">Total Tamu Hadir</p>
              </div>
              <div className="pt-4 border-t border-navy-700">
                <h4 className="text-lg font-semibold">{attendingGuests.length}</h4>
                <p className="text-navy-300 text-sm">Konfirmasi Hadir</p>
              </div>
            </div>
          </Card>

          {/* Recent Confirmations */}
          <Card className="bg-white/80 backdrop-blur-sm border-navy-200">
            <div className="p-6">
              <h3 className="text-lg font-serif text-navy-800 mb-4 flex items-center gap-2">
                <MessageSquare className="w-5 h-5" />
                Konfirmasi Terbaru
              </h3>
              
              <div className="space-y-3 max-h-64 overflow-y-auto">
                {guests.length === 0 ? (
                  <p className="text-navy-500 text-sm text-center py-4">
                    Belum ada konfirmasi
                  </p>
                ) : (
                  guests.slice(0, 10).map((guest) => (
                    <div key={guest.id} className="flex items-center justify-between py-2 border-b border-navy-100 last:border-b-0">
                      <div>
                        <p className="font-medium text-navy-800 text-sm">{guest.name}</p>
                        <div className="flex items-center gap-2 text-xs">
                          {guest.attendance === 'hadir' ? (
                            <>
                              <CheckCircle className="w-3 h-3 text-green-600" />
                              <span className="text-green-600">Hadir ({guest.guestCount} orang)</span>
                            </>
                          ) : (
                            <>
                              <XCircle className="w-3 h-3 text-red-600" />
                              <span className="text-red-600">Tidak Hadir</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default GuestForm;