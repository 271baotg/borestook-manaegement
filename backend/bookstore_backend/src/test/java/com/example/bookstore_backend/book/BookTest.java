package com.example.bookstore_backend.book;

import com.example.bookstore_backend.model.Book;
import com.example.bookstore_backend.repository.BookRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.annotation.Rollback;

import static org.assertj.core.api.Assertions.assertThat;

@DataJpaTest(showSql = false)
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
@Rollback(value = false)
public class BookTest {
    @Autowired
    private BookRepository repo;

    @Test
    public void testCreateBook(){
        Book newBook = new Book();

        newBook.setTitle("Thao Túng Tâm Lý");
        newBook.setAuthor("Shannon Thomas, LCSW");
        newBook.setDescription("“Thao túng tâm lý” là một dạng của lạm dụng tâm lý. Cũng giống như lạm dụng tâm lý, thao túng tâm lý có thể xuất hiện ở bất kỳ môi trường nào, từ bất cứ đối tượng độc hại nào. Đó có thể là bố mẹ ruột, anh chị em ruột, người yêu, vợ hoặc chồng, sếp hay đồng nghiệp… của bạn. Với tính chất bí hiểm, âm thầm gây hại, thao túng, lạm dụng tâm lý làm tổn thương cảm xúc, lòng tự trọng, cuộc sống của mỗi nạn nhân. Những người từng bị lạm dụng tâm lý thường không thể miêu tả rõ ràng điều gì đã xảy ra với mình. Trong nhiều trường hợp, nạn nhân bị thao túng đến mức tự hỏi có phải họ là người có lỗi, thậm chí họ có phải là người độc hại trong mối quan hệ đó. Hành vi của (những) kẻ lạm dụng giống như một trò chơi bí ẩn, tệ hại và lặp đi lặp lại, do một cá nhân hoặc một nhóm người thực hiện với nạn nhân. Những hành vi này được ngụy trang tài tình đến mức hành vi độc ác của họ diễn ra thường xuyên, nhưng không bị phát hiện. Shannon Thomas giới thiệu những kiến thức cơ bản về đặc điểm, các dạng của lạm dụng tâm lý nói chung, thao túng tâm lý nói riêng, và cung cấp cho người đọc hành trình chữa lành gồm 6 giai đoạn: - Giai đoạn 1: Tuyệt vọng - Giai đoạn 2: Nhận diện - Giai đoạn 3: Thức tỉnh - Giai đoạn 4: Những ranh giới - Giai đoạn 5: Phục hồi - Giai đoạn 6: Duy trì Bằng những kiến thức chuyên sâu và sự thấu hiểu, tác giả sẽ giúp bạn từng bước vượt qua những rắc rối của thao túng tâm lý, lạm dụng tiểm ẩn để có cuộc sống ý nghĩa và lành mạnh hơn. Thông tin tác giả: Shannon Thomas, là một nhà giám sát công tác xã hội y tế được cấp phép hành nghề, và là chủ phòng tư vấn/chuyên gia tư vấn tâm lý chính của phòng tư vấn Southlake Christian (SCC) ở Southlake, bang Texas. SCC từng nhận giải thưởng “Phòng thực hành tư vấn tâm lý tốt nhất” năm 2016 của Living Magazine khu vực Hạt Northeast Tarrant tại Dallas-Fort Worth. Thomas là Trợ giảng chuyên ngành và là thành viên Ủy ban tư vấn của Khoa Công tác xã hội – Trường Đại học Texas Christian. Cách tiếp cận khi tư vấn tâm lý của cô ấy xuất phát từ góc nhìn của một nhà tư vấn tâm lý được cấp phép hành nghề đồng thời từ góc nhìn của một người đi trước, một người sống sót sau khi bị lạm dụng tâm lý. Mã hàng\t8936066692298 Tên Nhà Cung Cấp\t1980 Books Tác giả\tShannon Thomas, LCSW Người Dịch\tTrương Tuấn NXB\tNXB Dân Trí Năm XB\t2022 Trọng lượng (gr)\t340 Kích Thước Bao Bì\t20.5 x 13 x 1 cm Số trang\t328 Hình thức\tBìa Mềm Sản phẩm hiển thị trong 1980 Books VNPAY RƯỚC DEAL LINH ĐÌNH VUI ĐÓN TRUNG THU Sản phẩm bán chạy nhất\tTop 100 sản phẩm Kỹ năng sống bán chạy của tháng Giá sản phẩm trên Fahasa.com đã bao gồm thuế theo luật hiện hành. Bên cạnh đó, tuỳ vào loại sản phẩm, hình thức và địa chỉ giao hàng mà có thể phát sinh thêm chi phí khác như Phụ phí đóng gói, phí vận chuyển, phụ phí hàng cồng kềnh,... Chính sách khuyến mãi trên Fahasa.com không áp dụng cho Hệ thống Nhà sách Fahasa trên toàn quốc Thao Túng Tâm Lý - Nhận Diện, Thức Tỉnh Và Chữa Lành Những Tổn Thương Tiềm Ẩn Trong cuốn “Thao túng tâm lý”, tác giả Shannon Thomas giới thiệu đến độc giả những hiểu biết liên quan đến thao túng tâm lý và lạm dụng tiềm ẩn. “Thao túng tâm lý” là một dạng của lạm dụng tâm lý. Cũng giống như lạm dụng tâm lý, thao túng tâm lý có thể xuất hiện ở bất kỳ môi trường nào, từ bất cứ đối tượng độc hại nào. Đó có thể là bố mẹ ruột, anh chị em ruột, người yêu, vợ hoặc chồng, sếp hay đồng nghiệp… của bạn. Với tính chất bí hiểm, âm thầm gây hại, thao túng, lạm dụng tâm lý làm tổn thương cảm xúc, lòng tự trọng, cuộc sống của mỗi nạn nhân. Những người từng bị lạm dụng tâm lý thường không thể miêu tả rõ ràng điều gì đã xảy ra với mình.");
        newBook.setCopies(6);
        newBook.setCopiesAvailable(15);
        newBook.setCategory("Kĩ năng sống");
        newBook.setImg("https://cdn0.fahasa.com/media/catalog/product/8/9/8936066692298.jpg");

        Book saveBook = repo.save(newBook);

        assertThat(saveBook).isNotNull();
        assertThat(saveBook.getId()).isGreaterThan(0);
    }
}
