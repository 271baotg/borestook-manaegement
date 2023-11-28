/* Câu hỏi ---------------------------------------------------------------------------
 Trong lĩnh vực xe điện, Tesla đã sản xuất nhiều mẫu xe điện với nhiều thông số kỹ thuật khác nhau.
 Khi số lượng mẫu xe và thông số kỹ thuật chi tiết của chúng tăng lên, việc quản lý thủ công trở nên khó khăn hơn.
 Tuy nhiên, lập trình sẽ cung cấp một giải pháp để quản lý hiệu quả và dễ dàng những thông tin phức tạp như vậy.

   Hướng dẫn chi tiết:
   1. Tạo một lớp (class) có tên 'TeslaModels' để quản lý thông tin về các mẫu xe Tesla.
   2. Bên trong lớp (class) 'TeslaModels', sử dụng Map để lưu trữ thông tin về các mẫu xe Tesla.
   3. Mỗi mẫu xe Tesla phải có những đặc điểm sau:
      - Model name (String)
      - Price (int)
      - Range (int, in miles)
      - Battery capacity (int, in kWh)
   4. Triển khai các phương thức sau trong lớp (class) 'TeslaModels':
      - `addTeslaModel()`: Tạo một đối tượng (object) TeslaModel mới với các tham số đã cho và thêm nó vào Map.
      - `getTeslaModel()`: Truy xuất mẫu xe Tesla theo tên từ Map và trả nó lại.
   5. Trong hàm 'Main',
      - Tạo một instance của lớp (class) 'TeslaModels'.
      - Sử dụng phương thức 'addTeslaModel' để thêm thông tin cho 3 mẫu xe Tesla:
        - "Model 3" có giá 39999 USD, phạm vi hoạt động 250 dặm và dung lượng pin 62 kWh.
        - "Model S" có giá 79999 USD, phạm vi hoạt động 375 dặm và dung lượng pin 82 kWh.
        - "Model X" có giá 89999 USD, phạm vi hoạt động 330 dặm và dung lượng pin 75 kWh.
   6. Xuất thông tin về mẫu Tesla "Model S" bằng phương thức 'getTeslaModel'.
   7. Xuất thông tin chi tiết về mẫu Tesla "Model S"

Kết quả mong đợi: Vui lòng điền giá trị thích hợp tại vị trí {value} và không in dấu ngoặc ({}).
   Model Name: {value}
   Price: ${value} USD
   Range: {value} miles
   Battery Capacity: {value} kWh
======================================================================================== */

// Import HashMap class
import java.util.HashMap;
import java.util.Map;

public class Main {
    public static void main(String[] args) {
        // Tạo một instance mới của lớp (class) TeslaModels
        TeslaModels teslaModels = new TeslaModels();

        // Thêm thông tin cho các model xe Tesla: "Model 3", "Model S" và "Model X"
        teslaModels.addTeslaModel("Model 3", 39999, 250, 62);
        teslaModels.addTeslaModel("Model S", 79999, 375, 82);
        teslaModels.addTeslaModel("Model X", 89999, 330, 75);

        TeslaModel teslaModel = teslaModels.getMap().get("Model S");
        // Xuất thông tin chi tiết của model Tesla "Model S"
        System.out.println("Model Name: " + teslaModel.getModelName());
        System.out.println("Price: $" + teslaModel.getPrice() + " USD");
        System.out.println("Range: " + teslaModel.getRange() + " miles");
        System.out.println("Battery Capacity: " + teslaModel.getBatteryCapacity() + " kWh");

    }
}

class TeslaModels {
    // Khai báo Map lưu trữ mẫu xe Tesla
    private Map<String, TeslaModel> map;

    public Map getMap(){
        return this.map;
    }


    // Dùng constructor để khởi tạo đối tượng (object) HashMap
    public TeslaModels(){
        this.map = new HashMap<>();
    }

    // Định nghĩa phương thức addTeslaModel()
    public void addTeslaModel(String modelName, int price, int range, int batteryCapacity){
        TeslaModel teslaModel = new TeslaModel(modelName, price, range, batteryCapacity);
        map.put(modelName, teslaModel);
    }


    // Định nghĩa phương thức getTeslaModel()
    public TeslaModel getTeslaModel(String modelName){
        return (TeslaModel) map.get(modelName);
    }

}

class TeslaModel {
    // Khai báo các biến model name, price, range và battery capacity
    private String modelName;
    private int price;
    private int range;
    private int batteryCapacity;

    public String getModelName(){
        return this.modelName;
    }

    public int getPrice(){
        return this.price;
    }

    public int getRange(){
        return this.range;
    }

    public int getBatteryCapacity(){
        return this.batteryCapacity;
    }

    // Dùng constructor để khởi tạo model name, price, range và battery capacity
    public TeslaModel(String modelName, int price, int range, int batteryCapacity){
        this.modelName = modelName;
        this.price = price;
        this.range = range;
        this.batteryCapacity = batteryCapacity;
    }

}