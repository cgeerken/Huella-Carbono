import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useI18nStore, translations } from '@/lib/i18n';
import * as Icons from 'lucide-react';

interface InputCardProps {
  field: {
    id: string;
    icon: string;
    title: string;
    titleEn: string;
    label: string;
    labelEn: string;
    placeholder?: string;
    select?: {
      options: { value: string; label: string }[];
    };
  };
  value: number | string;
  onChange: (field: string, value: number | string) => void;
}

export function InputCard({
  field,
  value,
  onChange,
}: InputCardProps) {
  const { language } = useI18nStore();
  const t = translations[language];

  const Icon = Icons[field.icon as keyof typeof Icons];

  const handleInputChange = (inputValue: string) => {
    if (field.select) {
      onChange(field.id, inputValue);
    } else {
      const numValue = inputValue === '' ? 0 : Math.max(0, Number(inputValue));
      onChange(field.id, numValue);
    }
  };

  return (
    <Card className="overflow-hidden bg-green-900/80 backdrop-blur-sm border border-green-700 group hover:bg-green-900/90 transition-colors shadow-lg">
      <div className="p-4 flex items-center space-x-3 border-b border-green-700">
        <div className="bg-green-500/20 p-2 rounded-lg text-green-300 group-hover:bg-green-500/30 transition-colors">
          <Icon className="h-5 w-5" />
        </div>
        <h3 className="font-medium text-green-100">
          {language === 'es' ? field.title : field.titleEn}
        </h3>
      </div>
      <div className="p-4 space-y-4">
        <div>
          <Label htmlFor={field.id} className="text-green-100">
            {language === 'es' ? field.label : field.labelEn}
          </Label>
          {field.select ? (
            <Select
              value={value as string}
              onValueChange={handleInputChange}
            >
              <SelectTrigger className="mt-1 bg-green-800/50 border-green-600 text-green-100">
                <SelectValue placeholder={field.placeholder} />
              </SelectTrigger>
              <SelectContent>
                {field.select.options.map((option) => (
                  <SelectItem
                    key={option.value}
                    value={option.value}
                    className="text-green-900"
                  >
                    {language === 'es' 
                      ? t.fields[field.id].options[option.value as keyof typeof t.fields[typeof field.id]['options']]
                      : option.value.split('-').map(word => 
                          word.charAt(0).toUpperCase() + word.slice(1)
                        ).join(' ')
                    }
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          ) : (
            <Input
              id={field.id}
              type="number"
              min="0"
              value={value === 0 ? '' : value}
              onChange={(e) => handleInputChange(e.target.value)}
              placeholder={field.placeholder}
              className="mt-1 bg-green-800/50 border-green-600 text-green-100 placeholder:text-green-300/50 focus:border-green-500 focus:ring-green-500"
            />
          )}
        </div>
      </div>
    </Card>
  );
}